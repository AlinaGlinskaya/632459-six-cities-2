import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { Offer } from '../../types/offer.type';
import { OfferNameLength, OfferDescLength, Rating, RoomCount, GuestCount, Price } from '../../const.js';
import { City } from '../../types/city.enum';
import { HousingType } from '../../types/housing-type.enum';
import { Convenience } from '../../types/convenience.type';
import { User } from '../../types/user.type';
import { Coordinate } from '../../types/coordinate.type';

const {prop} = typegoose;

export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({required: true, minlength: OfferNameLength.MIN, maxlength: OfferNameLength.MAX})
  public offerName!: string;

  @prop({required: true, minlength: OfferDescLength.MIN, maxlength: OfferDescLength.MAX})
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

  @prop({required: true})
  public author!: User;

  @prop({required: true})
  public coordinates!: Coordinate;
}

export const offerModel = getModelForClass(OfferEntity);
