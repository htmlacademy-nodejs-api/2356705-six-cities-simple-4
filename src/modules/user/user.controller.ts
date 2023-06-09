import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Controller } from '../../common/controller/controller.abstract.js';
import UserRdo from './rdo/user.rdo.js';
import { createJWT, fillDTO } from '../../utils/common.js';
import { UserServiceInterface } from './user-service.interface.js';
import CreateUserDto from './dto/create-user.dto.js';
import { StatusCodes } from 'http-status-codes';
import { ConfigInterface } from '../../common/config/config.interface.js';
import HttpError from '../../common/errors/http-error.js';
import LoginUserDto from './dto/login-user.dto.js';
import { ValidateDtoMiddleware } from '../../common/middleware/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middleware/validate-objectid.middleware.js';
import { UploadFileMiddleware } from '../../common/middleware/upload-file.middleware.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import LoggedUserRdo from './rdo/logged-user.rdo.js';
import { UserConstants } from '../../types/constants.js';
import { PrivateRouteMiddleware } from '../../common/middleware/private-route.middleware.js';
import UploadUserAvatarResponse from './rdo/upload-user-avatar.response.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) protected config: ConfigInterface,
  ) {
    super(logger, config);

    this.logger.info('Маршруты для UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
    });
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const user = await this.userService.create(body, this.config.get('SALT'));
    const userToResponse = fillDTO(UserRdo, user);
    this.created<UserRdo>(res, userToResponse);
  }

  public async login(
    { body }: Request<UnknownRecord, UnknownRecord, LoginUserDto>,
    res: Response,
  ): Promise<void> {
    const user = await this
      .userService
      .verifyUser(body, this.config.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    const token = await createJWT(
      UserConstants.JWT_ALGORITHM,
      this.config.get('JWT_SECRET'),
      {
        email: user.email,
        id: user.id,
        type: user.type
      }
    );

    const logedUserToResponse = {
      ...fillDTO(LoggedUserRdo, user),
      token
    };
    this.ok<LoggedUserRdo>(res, logedUserToResponse);
  }

  public async uploadAvatar(req: Request, res: Response) {
    const { userId } = req.params;
    const uploadFile = { avatarPath: req.file?.filename };
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarResponse, uploadFile));
  }

  public async checkAuthenticate(req: Request, res: Response) {
    if (!req.user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }
    const { user: { email } } = req;
    const foundedUser = await this.userService.findByEmail(email);
    const logedUserToResponse = fillDTO(LoggedUserRdo, foundedUser);
    this.ok<LoggedUserRdo>(res, logedUserToResponse);
  }
}
