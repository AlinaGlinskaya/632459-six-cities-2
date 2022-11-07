import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import OfferShortResponse from './response/offer-short.response.js';
import { fillDTO } from '../../utils/common.js';
import * as core from 'express-serve-static-core';
import OfferResponse from './response/offer.response.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import { PrivateRouteMiddleWare } from '../../common/middlewares/private-route.middleware.js';

type ParamsGetOffer = {
  offerId: string
}

type ParamsPremiumOffer = {
  city: string
}

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleWare(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId')
      ]
    });
    this.addRoute({path: '/premium/:city', method: HttpMethod.Get, handler: this.showPremium});
  }

  public async index(req: Request, res: Response): Promise<void> {
    const {user} = req;
    const currentUser = user && await this.userService.findById(user.id);
    const offers = await this.offerService.find();
    const extendedOffers = offers.map((offer) => {
      const isFavorite = !!currentUser?.favorites.includes(offer.id);
      return {...offer, favorite: isFavorite};
    });

    this.ok(res, fillDTO(OfferShortResponse, extendedOffers));
  }

  public async show(req: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response): Promise<void> {
    const {user, params} = req;
    const {offerId} = params;
    const currentUser = user && await this.userService.findById(user.id);
    const offer = await this.offerService.findById(offerId);
    const extendedOffer = {
      ...offer,
      favorite: offer && !!currentUser?.favorites.includes(offer.id),
    };
    this.ok(res, fillDTO(OfferResponse, extendedOffer));
  }

  public async create(
    {body, user}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, authorId: user.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferResponse, offer));
  }

  public async update(
    {body, params}: Request<core.ParamsDictionary | ParamsGetOffer, Record<string, unknown>, UpdateOfferDto>,
    res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDTO(OfferResponse, updatedOffer));
  }

  public async delete({params}: Request<core.ParamsDictionary | ParamsGetOffer>, res: Response) {
    const {offerId} = params;

    await this.offerService.deleteById(offerId);
    this.noContent(res);
  }

  public async showPremium({params}: Request<core.ParamsDictionary | ParamsPremiumOffer>, res: Response) {
    const {city} = params;

    const offers = await this.offerService.findPremiumByCity(city);
    this.ok(res, fillDTO(OfferShortResponse, offers));
  }
}
