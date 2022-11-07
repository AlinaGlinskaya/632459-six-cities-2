import { OfferServiceInterface } from './offer-service.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import createOfferDto from './dto/create-offer.dto.js';
import chalk from 'chalk';
import updateOfferDto from './dto/update-offer.dto.js';
import { SortType, DefaultLimit } from '../../const.js';
import { setUcFirst } from '../../utils/common.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: createOfferDto): Promise<types.DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(chalk.green(`Offer ${dto.offerName} created.`));
    return result;
  }

  public async findById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .exec();
  }

  public async find(count?: number): Promise<types.DocumentType<OfferEntity>[]> {
    const limit = count ?? DefaultLimit.OFFERS;
    return this.offerModel
      .aggregate([
        {$addFields: {id: {$toString: '$_id'}}},
        {$limit: limit},
      ]).exec();
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

  public async findPremiumByCity(city: string): Promise<types.DocumentType<OfferEntity>[]> {
    const cityTitle = setUcFirst(city);
    return this.offerModel
      .find({city: cityTitle, premium: true})
      .sort({createdAt: SortType.Down})
      .limit(DefaultLimit.PREMIUM_OFFERS)
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, {'$inc': {commentCount: 1}});
  }

  public async calculateRating(offerId: string, rating: number): Promise<types.DocumentType<OfferEntity> | null> {
    const ratingInfo = await this.offerModel.findById(offerId).select('rating commentCount');
    if (ratingInfo) {
      const updatedRating = ((ratingInfo.rating * ratingInfo.commentCount) + rating) / (Number(ratingInfo.commentCount));
      return this.offerModel.findByIdAndUpdate(offerId, {'$set': {rating: updatedRating.toFixed(1)}});
    }
    return this.offerModel.findById(offerId);
  }

  public async findFavoriteByIds(offerIds: string[]): Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel.find({_id: offerIds});
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId})) !== null;
  }
}
