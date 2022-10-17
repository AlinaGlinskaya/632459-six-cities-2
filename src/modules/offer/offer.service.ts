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
import { SortType } from '../../const.js';

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

  public async findById(id: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(id)
      .populate('authorId')
      .exec();
  }

  public async find(count?: number): Promise<types.DocumentType<OfferEntity>[]> {
    const limit = count ?? OFFERS_LIMIT;
    return this.offerModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(limit)
      .exec();
  }

  public async updateById(id: string, dto: updateOfferDto): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, dto, {new: true})
      .populate('authorId')
      .exec();
  }

  public async deleteById(id: string): Promise<types.DocumentType<OfferEntity, types.BeAnObject> | null> {
    return this.offerModel
      .findByIdAndDelete(id)
      .exec();
  }
}


