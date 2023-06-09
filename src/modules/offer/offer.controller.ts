import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Controller } from '../../common/controller/controller.abstract.js';
import OfferRdo from './rdo/offer.rdo.js';
import { fillDTO } from '../../utils/common.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { ParamsDictionary } from 'express-serve-static-core';
import OfferIndexRdo from './rdo/offer.index.rdo.js';
import { UnknownRecord } from '../../types/unknown-record.type.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CommentRdo from '../comment/rdo/comment.rdo.js';
import { ValidateObjectIdMiddleware } from '../../common/middleware/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middleware/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middleware/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../common/middleware/private-route.middleware.js';
import { RequestQuery } from '../../types/request-query.type.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import UploadPreviewImageResponse from './rdo/upload-image.response.js';
import { UploadFileMiddleware } from '../../common/middleware/upload-file.middleware.js';

type ParamsOfferDetails = {
  offerId: string;
} | ParamsDictionary

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.ConfigInterface) config: ConfigInterface,
  ) {
    super(logger, config);

    this.logger.info('Маршруты для OfferController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/previewImage',
      method: HttpMethod.Post,
      handler: this.uploadPreviewImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
  }

  public async create(
    { body, user }: Request<UnknownRecord, UnknownRecord, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, userId: user.id });
    const offer = await this.offerService.findById(result.id);
    const offerToResponse = fillDTO(OfferRdo, offer);
    this.created<OfferRdo>(res, offerToResponse);
  }

  public async index({ query }: Request<ParamsOfferDetails, UnknownRecord, UpdateOfferDto, RequestQuery>,
    res: Response
  ): Promise<void> {
    const offers = await this.offerService.find(query.limit);
    const offersToResponse = fillDTO(OfferIndexRdo, offers);
    this.ok<OfferIndexRdo>(res, offersToResponse);
  }

  public async update(
    { body, params }: Request<ParamsOfferDetails, UnknownRecord, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    const offersToResponse = fillDTO(OfferRdo, updatedOffer);
    this.ok<OfferRdo>(res, offersToResponse);
  }

  public async show(
    { params }: Request<ParamsOfferDetails>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    const offersToResponse = fillDTO(OfferRdo, offer);
    this.ok<OfferRdo>(res, offersToResponse);
  }

  public async delete(
    { params }: Request<ParamsOfferDetails>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async getComments(
    { params, query }: Request<ParamsOfferDetails, UnknownRecord, UnknownRecord, RequestQuery>,
    res: Response
  ): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId, query.limit);
    const commentsToResponse = fillDTO(CommentRdo, comments);
    this.ok<CommentRdo>(res, commentsToResponse);
  }

  public async uploadPreviewImage(req: Request<ParamsOfferDetails>, res: Response) {
    const { offerId } = req.params;
    const updateDto = { previewImage: req.file?.filename };
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadPreviewImageResponse, { updateDto }));
  }
}
