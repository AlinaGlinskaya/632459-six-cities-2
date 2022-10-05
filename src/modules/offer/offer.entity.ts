import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import {Rating, RoomCount, GuestCount, Price } from '../../const.js';
import { City } from '../../types/city.enum.js';
import { HousingType } from '../../types/housing-type.enum.js';
import { Convenience } from '../../types/convenience.type.js';
import { Coordinate } from '../../types/coordinate.type.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true})
  public offerName!: string;

  @prop({required: true, trim: true})
  public description!: string;

  @prop({required: true})
  public date!: Date;

  @prop({required: true, enum: City})
  public city!: City;

  @prop({required: true})
  public preview!: string;

  @prop({required: true})
  public photos!: string[];

  @prop({required: true})
  public premium!: boolean;

  @prop({required: true})
  public favorite!: boolean;

  @prop({required: true, min: Rating.MIN, max: Rating.MAX})
  public rating!: number;

  @prop({required: true, enum: HousingType})
  public housingType!: HousingType;

  @prop({required: true, min: RoomCount.MIN, max: RoomCount.MAX})
  public roomCount!: number;

  @prop({required: true, min: GuestCount.MIN, max: GuestCount.MAX})
  public guestCount!: number;

  @prop({required: true, min: Price.MIN, max: Price.MAX})
  public price!: number;

  @prop({required: true})
  public conveniences!: Convenience[];

  @prop({required: true, ref: UserEntity})
  public authorId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount!: number;

  @prop({required: true})
  public coordinates!: Coordinate;
}

export const OfferModel = getModelForClass(OfferEntity);
