import typegoose, { getModelForClass, defaultClasses, Ref } from '@typegoose/typegoose';
import { Rating, RoomCount, GuestCount, Price, OfferNameLength, OfferDescriptionLength } from '../../const.js';
import { City } from '../../types/city.enum.js';
import { HousingType } from '../../types/housing-type.enum.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

class Coordinate {
  @prop()
  public latitude!: number;

  @prop()
  public longitude!: number;
}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  }
})

export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true, minlength: OfferNameLength.MIN, maxlength: OfferNameLength.MAX})
  public offerName!: string;

  @prop({required: true, trim: true, minlength: OfferDescriptionLength.MIN, maxlength: OfferDescriptionLength.MAX})
  public description!: string;

  @prop({required: true})
  public date!: Date;

  @prop({required: true, enum: City})
  public city!: City;

  @prop({required: true})
  public preview!: string;

  @prop({required: true, type: [String]})
  public photos!: string[];

  @prop({required: true})
  public premium!: boolean;

  @prop({required: true, min: Rating.MIN, max: Rating.MAX, default: 1})
  public rating!: number;

  @prop({required: true, enum: HousingType})
  public housingType!: HousingType;

  @prop({required: true, min: RoomCount.MIN, max: RoomCount.MAX})
  public roomCount!: number;

  @prop({required: true, min: GuestCount.MIN, max: GuestCount.MAX})
  public guestCount!: number;

  @prop({required: true, min: Price.MIN, max: Price.MAX})
  public price!: number;

  @prop({required: true, type: [String]})
  public conveniences!: string[];

  @prop({required: true, ref: UserEntity})
  public authorId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentCount!: number;

  @prop({required: true, type: Coordinate})
  public coordinates!: Coordinate;
}

export const OfferModel = getModelForClass(OfferEntity);
