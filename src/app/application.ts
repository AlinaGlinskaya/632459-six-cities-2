import { ConfigInterface } from '../common/config/config.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../types/component.types.js';
import 'reflect-metadata';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { getURI } from '../utils/db.js';
import express, {Express} from 'express';
import chalk from 'chalk';
import { ControllerInterface } from '../common/controller/controller.interface.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.OfferController) private offerController: ControllerInterface) {
    this.expressApp = express();
  }

  public initRoutes() {
    this.expressApp.use('/offers', this.offerController.router);
  }

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`DB_HOST===${this.config.get('DB_HOST')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    this.initRoutes();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(chalk.blue(`Server started on http://localhost:${this.config.get('PORT')}`));
  }
}
