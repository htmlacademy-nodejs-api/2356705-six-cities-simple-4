import { inject, injectable } from 'inversify';
import mongoose, { Mongoose } from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import { DatabaseClientInterface } from './database-client.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { Component } from '../../types/component.types.js';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export default class MongoClientService implements DatabaseClientInterface {
  private isConnected = false;
  private mongooseInstance: Mongoose | null = null;

  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface
  ) { }

  private async _connectWithRetry(uri: string): Promise<Mongoose> {
    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        return await mongoose.connect(uri);
      } catch (error) {
        attempt++;
        this.logger.error(`Неудачное подключение к БД. Попытка ${attempt}`);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    this.logger.error(`Невозможно подключиться к БД после ${attempt} попыток`);
    throw new Error('Подключение к БД прервано');
  }

  private async _connect(uri: string): Promise<void> {
    this.mongooseInstance = await this._connectWithRetry(uri);
    this.isConnected = true;
  }

  private async _disconnect(): Promise<void> {
    await this.mongooseInstance?.disconnect();
    this.isConnected = false;
    this.mongooseInstance = null;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('Подключение к БД уже установлено');
    }

    this.logger.info('Попытка подключения к БД…');
    await this._connect(uri);
    this.logger.info('Подключение к БД установлено.');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Нет подключения к БД');
    }

    await this._disconnect();
    this.logger.info('Соединение с БД разорвано.');
  }
}
