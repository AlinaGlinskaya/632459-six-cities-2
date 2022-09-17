import { City } from './city.enum';
import { Convenience } from './convenience.type';
import { Coordinate } from './coordinate.type';
import { HousingType } from './housing-type.enum';
import { User } from './user.type';

export type Offer = {
  offerName: string,
  description: string,
  date: Date,
  city: City,
  preview: string,
  photos: string[],
  premium: boolean,
  favorite: boolean,
  rating: number,
  housingType: HousingType,
  roomCount: number,
  guestCount: number,
  price: number,
  conveniences: Convenience[],
  author: User,
  coordinates: Coordinate
}
