import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { DocumentType } from '@typegoose/typegoose';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DocumentExistsInterface } from '../../types/document-exists.interface.js';

export interface OfferServiceInterface extends DocumentExistsInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  calculateRating(offerId: string, rating: number): Promise<DocumentType<OfferEntity> | null>;
  findFavoriteByIds(offerIds: string[]): Promise<DocumentType<OfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}
