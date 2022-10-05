import { OfferServiceInterface } from './offer-service.interface';
import {inject, injectable} from 'inversify';
import { Component } from '../../types/component.types';
import { LoggerInterface } from '../../common/logger/logger.interface';
import { types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity';
import createOfferDto from './dto/create-offer.dto';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>) {}

  public async create(dto: createOfferDto): Promise<types.DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`Offer ${dto.offerName} created.`);

    return result;
  }

  public async findById(id: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id).exec();
  }
}
