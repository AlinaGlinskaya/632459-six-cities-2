import { City } from '../../../types/city.enum.js';
import { Coordinate } from '../../../types/coordinate.type.js';
import { HousingType } from '../../../types/housing-type.enum.js';

export default class CreateOfferDto {
  public offerName!: string;
  public description!: string;
  public date!: Date;
  public city!: City;
  public preview!: string;
  public photos!: string[];
  public premium!: boolean;
  public favorite!: boolean;
  public rating!: number;
  public housingType!: HousingType;
  public roomCount!: number;
  public guestCount!: number;
  public price!: number;
  public conveniences!: string[];
  public authorId!: string;
  public coordinates!: Coordinate;
}
