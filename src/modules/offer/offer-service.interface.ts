import CreateOfferDto from './dto/create-offer.dto';
import { OfferEntity } from './offer.entity';
import { DocumentType } from '@typegoose/typegoose';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
}
