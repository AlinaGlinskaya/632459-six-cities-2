import { Expose, Type } from 'class-transformer';
import { City } from '../../../types/city.enum.js';
import { HousingType } from '../../../types/housing-type.enum.js';
import UserResponse from '../../user/response/user.response.js';
import OfferCoordinateResponse from './offer-coordinate.response.js';

export default class OfferShortResponse {
  @Expose()
  public id!: string;

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
