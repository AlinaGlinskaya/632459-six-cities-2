import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import { OfferNameLength, OfferDescLength, Rating, RoomCount, GuestCount, Price } from '../../const.js';
import { City } from '../../types/city.enum';
import { HousingType } from '../../types/housing-type.enum';
import { Convenience } from '../../types/convenience.type';
import { Coordinate } from '../../types/coordinate.type';
import { UserEntity } from '../user/user.entity';

const {prop} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true, minlength: OfferNameLength.MIN, maxlength: OfferNameLength.MAX})
  public offerName!: string;

  @prop({required: true, trim: true, minlength: OfferDescLength.MIN, maxlength: OfferDescLength.MAX})
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

export const offerModel = getModelForClass(OfferEntity);
