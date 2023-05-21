import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {Component} from '../types/component.types.js';
import { DatabaseClientInterface } from '../common/database-client/database-client.interface';
import { getMongoURI } from '../utils/db.js';
import { UserModel } from '../modules/user/user.entity.js';

@injectable()
export default class Application {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface
  ) {}

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Приложение инициализировано…');
    this.logger.info(`Получено значение переменной $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Получено значение переменной $DB_HOST: ${this.config.get('DB_HOST')}`);

    this.logger.info('Инициализация подклюяения к БД…');
    await this._initDb();
    this.logger.info('Подключен к БД');
    const user = await UserModel.create({
      email: 'test@email.local',
      avatarPath: 'keks.jpg',
      name: 'Keks',
      type: 'pro'
    });
    const error = user.validateSync();
    console.log(error);
  }
}
