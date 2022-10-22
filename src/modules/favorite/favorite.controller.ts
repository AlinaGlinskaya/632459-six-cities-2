import { Controller } from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { UserServiceInterface } from '../user/user-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { fillDTO } from '../../utils/common.js';
import OfferResponse from '../offer/response/offer.response.js';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

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
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface) {
    super(logger);

    this.logger.info('Register routes for FavoriteController...');
    this.addRoute({path: '/:userId', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/:userId/:offerId', method: HttpMethod.Post, handler: this.addFavorite});
    this.addRoute({path: '/:userId/:offerId', method: HttpMethod.Delete, handler: this.removeFavorite});
  }

  public async index({params}: Request<core.ParamsDictionary | ParamsGetFavorite>, res: Response): Promise<void> {
    const {userId} = params;

    const user = await this.userService.findFavoritesIds(userId);
    const favoriteIds = user?.favorites;

    if (!favoriteIds) {
      this.ok(res, favoriteIds);
    } else {
      const offers = await this.offerService.findFavoriteByIds(favoriteIds);
      this.ok(res, fillDTO(OfferResponse, offers));
    }
  }

  public async addFavorite({params}: Request<core.ParamsDictionary | ParamsChangeFavorite>, res: Response): Promise<void> {
    const {userId, offerId} = params;
    const offer = await this.userService.addToFavorites(userId, offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found`,
        'Favorite Controller'
      );
    }

    this.noContent(res, offer);
  }

  public async removeFavorite({params}: Request<core.ParamsDictionary | ParamsChangeFavorite>, res: Response): Promise<void> {
    const {userId, offerId} = params;
    const offer = await this.userService.removeFromFavorites(userId, offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found`,
        'Favorite Controller'
      );
    }

    this.noContent(res, offer);
  }
}
