import { Expose, Type, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { City } from '../../../types/city.enum.js';
import { HousingType } from '../../../types/housing-type.enum.js';
import UserResponse from '../../user/response/user.response.js';
import OfferCoordinateResponse from './offer-coordinate.response.js';

export default class OfferShortResponse {
  @Expose()
  @Transform((_id) => _id.obj._id)
  public _id!: ObjectId;

  @Expose()
  public offerName!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public preview!: string;

  @Expose()
  public premium!: boolean;

  @Expose()
  public favorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public housingType!: HousingType;

  @Expose()
  public price!: number;

  @Expose()
  public commentCount!: number;

  @Expose({ name: 'coordinates'})
  @Type(() => OfferCoordinateResponse)
  public coordinates!: OfferCoordinateResponse;

  @Expose({name: 'authorId'})
  @Type(() => UserResponse)
  public author!: UserResponse;
}
