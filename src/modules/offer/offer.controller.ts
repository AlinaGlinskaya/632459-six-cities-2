import { Request, Response } from 'express';
import {inject, injectable} from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';

@injectable()
export default class OfferController extends Controller {
  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    //this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public index(req: Request, res: Response): void {
  //
  }

  // public create(req: Request, res: Response): void {
  // //
  // }
}
