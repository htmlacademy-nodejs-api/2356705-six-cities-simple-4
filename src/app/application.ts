import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {Component} from '../types/component.types.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface) {}

  public async init() {
    this.logger.info('Приложение инициализировано…');
    this.logger.info(`Получено значение переменной $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Получено значение переменной $DB_HOST: ${this.config.get('DB_HOST')}`);
  }
}
