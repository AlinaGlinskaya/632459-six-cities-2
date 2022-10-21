import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {inject, injectable} from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import OfferResponse from './response/offer.response.js';
import { fillDTO } from '../../utils/common.js';

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    //this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async index(_req: Request, _res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const offerResponse = fillDTO(OfferResponse, offers);
    this.send(_res, StatusCodes.OK, offerResponse);
  }

  // public create(req: Request, res: Response): void {
  // //
  // }
}
