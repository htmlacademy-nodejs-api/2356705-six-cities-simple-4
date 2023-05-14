import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';

export default class Application {
  private logger!: LoggerInterface;
  private config!: ConfigInterface;

  constructor(logger: LoggerInterface, config: ConfigInterface) {
    this.logger = logger;
    this.config = config;
  }

  public async init() {
    this.logger.info('Приложение инициализировано…');
    this.logger.info(`Получено значение переменной $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Получено значение переменной $DB_HOST: ${this.config.get('DB_HOST')}`);
  }
}