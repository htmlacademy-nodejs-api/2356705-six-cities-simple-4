import {Container} from 'inversify';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import { DatabaseClientInterface } from '../common/database-client/database-client.interface';
import Application from './application.js';
import LoggerService from '../common/logger/logger.service.js';
import ConfigService from '../common/config/config.service.js';
import MongoClientService from '../common/database-client/mongo-client.service.js';
import {Component} from '../types/component.types.js';

const applicationContainer = new Container();

applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseClientInterface>(Component.DatabaseClientInterface).to(MongoClientService).inSingletonScope();

export {applicationContainer};
