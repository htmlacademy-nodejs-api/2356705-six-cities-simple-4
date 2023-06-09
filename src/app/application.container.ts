import { Container } from 'inversify';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { DatabaseClientInterface } from '../common/database-client/database-client.interface';
import Application from './application.js';
import LoggerService from '../common/logger/logger.service.js';
import ConfigService from '../common/config/config.service.js';
import MongoClientService from '../common/database-client/mongo-client.service.js';
import { Component } from '../types/component.types.js';
import { ExceptionFilterInterface } from '../common/exception-filters/exception-filter.interface.js';
import HttpErrorExceptionFilter from '../common/exception-filters/http-error.exception-filter.js';
import ValidationExceptionFilter from '../common/exception-filters/validation.exception-filter.js';
import BaseExceptionFilter from '../common/exception-filters/base.exception-filter.js';

export function createApplicationContainer() {
  const restApplicationContainer = new Container();
  restApplicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
  restApplicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
  restApplicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
  restApplicationContainer.bind<DatabaseClientInterface>(Component.DatabaseClientInterface).to(MongoClientService).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilterInterface>(Component.HttpErrorExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilterInterface>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  restApplicationContainer.bind<ExceptionFilterInterface>(Component.BaseExceptionFilter).to(BaseExceptionFilter).inSingletonScope();

  return restApplicationContainer;
}
