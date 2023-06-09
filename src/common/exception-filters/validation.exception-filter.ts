import { ExceptionFilterInterface } from './exception-filter.interface.js';
import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { LoggerInterface } from '../logger/logger.interface.js';
import ValidationError from '../errors/validation-error.js';
import { Component } from '../../types/component.types.js';
import { createErrorObject } from '../../utils/common.js';
import { ServiceError } from '../../types/service-error.enum.js';

@injectable()
export default class ValidationExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`);

    error.details.forEach(
      (errorField) => this.logger.error(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ServiceError.ValidationError, error.message, error.details));
  }
}
