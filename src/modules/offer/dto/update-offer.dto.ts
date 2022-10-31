import { City } from '../../../types/city.enum.js';
import { Coordinate } from '../../../types/coordinate.type.js';
import { HousingType } from '../../../types/housing-type.enum.js';
import { MinLength, MaxLength, IsDateString, IsEnum,
  IsLatitude, IsLongitude, ValidateNested, IsString,
  IsArray, IsNotEmpty, IsBoolean, Min, Max, IsMongoId, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { Rating, OfferNameLength, OfferDescriptionLength, RoomCount, GuestCount, Price, HOUSE_PHOTO_COUNT } from '../../../const.js';

class CoordinatesSchema {
  @IsLatitude({message: 'Property must be correct latitude'})
    latitude?: number;

  @IsLongitude({message: 'Property must be correct longitude'})
    longitude?: number;
}

export default class CreateOfferDto {
  @MinLength(OfferNameLength.MIN, {message: `Minimum offerName length must be ${OfferNameLength.MIN}`})
  @MaxLength(OfferNameLength.MAX, {message: `Maximum offerName length must be ${OfferNameLength.MAX}`})
  public offerName!: string;

  @MinLength(OfferDescriptionLength.MIN, {message: `Minimum description length must be ${OfferDescriptionLength.MIN}`})
  @MaxLength(OfferDescriptionLength.MAX, {message: `Maximum description length must be ${OfferDescriptionLength.MAX}`})
  public description!: string;

  @IsDateString({}, {message: 'Date must be valid ISO date'})
  public date!: Date;

  @IsEnum(City, {message: 'City must be one of six cities'})
  public city!: City;

  @IsString({message: 'Preview is required'})
  public preview!: string;

  @IsArray({message: 'Photos must be an array'})
  @IsString({each: true, message: 'Photo url must be a string'})
  @IsNotEmpty({message: 'Photos is required'})
  @ArrayMinSize(HOUSE_PHOTO_COUNT, {message: `Minimum photo count is ${HOUSE_PHOTO_COUNT}`})
  public photos!: string[];

  @IsBoolean({message: 'Premuim must be boolean value'})
  public premium!: boolean;

  @IsBoolean({message: 'Favorite must be boolean value'})
  public favorite!: boolean;

  @Min(Rating.MIN, {message: `Minimum rating is ${Rating.MIN}`})
  @Max(Rating.MAX, {message: `Maximum rating is ${Rating.MAX}`})
  public rating!: number;

  @IsEnum(HousingType, {message: 'Type must be one of: apartment, house, room, hotel'})
  public housingType!: HousingType;

  @Min(RoomCount.MIN, {message: `Minimum room count is ${RoomCount.MIN}`})
  @Max(RoomCount.MAX, {message: `Maximum room count is ${RoomCount.MAX}`})
  public roomCount!: number;

  @Min(GuestCount.MIN, {message: `Minimum guest count is ${GuestCount.MIN}`})
  @Max(GuestCount.MAX, {message: `Maximum guest count is ${GuestCount.MAX}`})
  public guestCount!: number;

  @Min(Price.MIN, {message: `Minimum price must be ${Price.MIN}`})
  @Max(Price.MAX, {message: `Maximum price must be ${Price.MAX}`})
  public price!: number;

  @IsArray({message: 'Conveniences must be an array'})
  @IsString({each: true, message: 'Convenience must be a string'})
  @IsNotEmpty({message: 'Conveniences is required'})
  public conveniences!: string[];

  @IsMongoId({message: 'authorId field must be valid id'})
  public authorId!: string;

  @ValidateNested()
  @Type(() => CoordinatesSchema)
  public coordinates!: Coordinate;
}
