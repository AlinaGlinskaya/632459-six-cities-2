import { Controller } from '../../common/controller/controller.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { fillDTO } from '../../utils/common.js';
import OfferResponse from '../offer/response/offer.response.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';

type ParamsGetFavorite = {
  userId: string
}

type ParamsChangeFavorite = {
  offerId: string,
  userId: string
}

@injectable()
export default class FavoriteController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteController...');
    this.addRoute({
      path: '/:userId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'user', 'userId')
      ]
    });
    this.addRoute({
      path: '/:userId/:offerId',
      method: HttpMethod.Post,
      handler: this.addFavorite,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.userService, 'user', 'userId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:userId/:offerId',
      method: HttpMethod.Delete,
      handler: this.removeFavorite,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.userService, 'user', 'userId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId')
      ]});
  }

  public async index({params}: Request<core.ParamsDictionary | ParamsGetFavorite>, res: Response): Promise<void> {
    const {userId} = params;

    const user = await this.userService.findFavoritesIds(userId);
    const favoriteIds = user?.favorites;

    if (!favoriteIds || favoriteIds.length === 0) {
      this.ok(res, []);
    } else {
      const offers = await this.offerService.findFavoriteByIds(favoriteIds);
      this.ok(res, fillDTO(OfferResponse, offers));
    }
  }

  public async addFavorite({params}: Request<core.ParamsDictionary | ParamsChangeFavorite>, res: Response): Promise<void> {
    const {userId, offerId} = params;
    const userFavorite = await this.userService.addToFavorites(userId, offerId);
    this.ok(res, userFavorite);
  }

  public async removeFavorite({params}: Request<core.ParamsDictionary | ParamsChangeFavorite>, res: Response): Promise<void> {
    const {userId, offerId} = params;
    const userFavorite = await this.userService.removeFromFavorites(userId, offerId);
    this.ok(res, userFavorite);
  }
}
