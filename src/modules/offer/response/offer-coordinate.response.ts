import {Expose} from 'class-transformer';

export default class OfferCoordinateResponse {
  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}
