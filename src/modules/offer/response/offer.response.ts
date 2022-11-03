import { Expose, Type } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { HousingType } from '../../../types/housing-type.enum.js';
import UserResponse from '../../user/response/user.response.js';
import OfferCoordinateResponse from './offer-coordinate.response.js';

export default class OfferResponse {
  @Expose()
  public _id!: string;

  @Expose()
  public offerName!: string;

  @Expose()
  public description!: string;

  @Expose()
  public date!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public preview!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public premium!: boolean;

  @Expose()
  public favorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public housingType!: HousingType;

  @Expose()
  public roomCount!: number;

  @Expose()
  public guestCount!: number;

  @Expose()
  public price!: number;

  @Expose()
  public conveniences!: string[];

  @Expose({name: 'authorId'})
  @Type(() => UserResponse)
  public author!: UserResponse;

  @Expose()
  public commentCount!: number;

  @Expose({ name: 'coordinates'})
  @Type(() => OfferCoordinateResponse)
  public coordinates!: OfferCoordinateResponse;
}
