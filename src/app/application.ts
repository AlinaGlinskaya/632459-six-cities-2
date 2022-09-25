import { ConfigInterface } from '../common/config/config.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../types/component.types.js';
import 'reflect-metadata';

@injectable()
export default class Application {
  constructor(@inject(Component.LoggerInterface) private logger: LoggerInterface, @inject(Component.ConfigInterface) private config: ConfigInterface) {}

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`DB_HOST===${this.config.get('DB_HOST')}`);
  }
}
