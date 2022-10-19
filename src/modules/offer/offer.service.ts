import { OfferServiceInterface } from './offer-service.interface.js';
import {inject, injectable} from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import createOfferDto from './dto/create-offer.dto.js';
import { OFFERS_LIMIT } from '../../const.js';
import chalk from 'chalk';
import updateOfferDto from './dto/update-offer.dto.js';
import { SortType, PREMIUM_OFFERS_LIMIT, shortOfferFields } from '../../const.js';
import { City } from '../../types/city.enum.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>) {}

  public async create(dto: createOfferDto): Promise<types.DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(chalk.green(`Offer ${dto.offerName} created.`));
    return result;
  }

  public async findById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate('authorId')
      .exec();
  }

  public async find(count?: number): Promise<types.DocumentType<OfferEntity>[]> {
    const limit = count ?? OFFERS_LIMIT;
    return this.offerModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(limit)
      .select(shortOfferFields)
      .exec();
  }

  public async updateById(offerId: string, dto: updateOfferDto): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('authorId')
      .exec();
  }

  public async deleteById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findPremiumByCity(city: City): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({city: city, premium: true})
      .sort({createdAt: SortType.Down})
      .limit(PREMIUM_OFFERS_LIMIT)
      .select(shortOfferFields)
      .exec();
  }

  public async findFavorites(userId: string): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      {
        $lookup: {
          from: 'users',
          let: {offerId: '$_id'},
          pipeline: [
            {$match: {$expr: {$in: ['$$offerId', '$favorites']}}}
          ],
          as: 'favorites'
        },
      },
      { $unset: ['date', 'city', 'premium', 'photos', 'conveniences', 'coordinates'] },
      { $limit: 3},
    ]).exec();
  }

  public async incCommentCount(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, {'$inc': {commentCount: 1}});
  }

  // public async calculateRating(offerId: string, commentId: string): Promise<types.DocumentType<OfferEntity> | null> {
  //   let updatedRating;
  //   const newCommentRating = await this.offerModel.aggregate([
  //     {
  //       $lookup: {
  //         from: 'comments',
  //         let: { offerId: '$offerId'},
  //         pipeline: [
  //           {$match: {$eq: ['$$commentId', commentId]}}
  //         ],
  //         as: 'comment'
  //       }
  //     }
  //   ]);
  //   const ratingInfo = this.offerModel.findById(offerId).select('rating commentCount');
  //   if (!ratingInfo?.rating) {
  //     updatedRating = 2;
  //   } else {

  //   }
  // }
}


