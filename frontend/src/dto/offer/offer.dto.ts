import UserDto from '../user/user.dto';

enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

type Coordinate = {
  latitude: number,
  longitude: number
}

enum HousingType {
  Apartment = 'Apartment',
  House = 'House',
  Room = 'Room',
  Hotel = 'Hotel'
}

export default class OfferDto {
  public _id!: string;

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

  public author!: UserDto;

  public coordinates!: Coordinate;
}
