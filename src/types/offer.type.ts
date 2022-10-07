import { City } from './city.enum.js';
import { Convenience } from './convenience.type.js';
import { Coordinate } from './coordinate.type.js';
import { HousingType } from './housing-type.enum.js';
import { User } from './user.type.js';

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
