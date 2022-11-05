type Coordinate = {
  latitude: number,
  longitude: number
}

export default class CreateOfferDto {
  public offerName!: string;

  public description!: string;

  public date!: Date;

  public city!: string;

  public preview!: string;

  public photos!: string[];

  public premium!: boolean;

  public favorite!: boolean;

  public rating!: number;

  public housingType!: string;

  public roomCount!: number;

  public guestCount!: number;

  public price!: number;

  public conveniences!: string[];

  public coordinates!: Coordinate;
}
