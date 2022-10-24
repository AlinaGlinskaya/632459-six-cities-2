import { City } from '../../../types/city.enum.js';
import { Coordinate } from '../../../types/coordinate.type.js';
import { HousingType } from '../../../types/housing-type.enum.js';
import { MinLength, MaxLength, IsDateString, IsEnum,
  IsLatitude, IsLongitude, ValidateNested, IsString,
  IsArray, IsNotEmpty, IsBoolean, Min, Max, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

class CoordinatesSchema {
  @IsLatitude({message: 'Property must be correct latitude'})
    latitude?: number;

  @IsLongitude({message: 'Property must be correct longitude'})
    longitude?: number;
}

export default class CreateOfferDto {
  @MinLength(10, {message: 'Minimum offerName length must be 10'})
  @MaxLength(100, {message: 'Maximum offerName length must be 100'})
  public offerName!: string;

  @MinLength(10, {message: 'Minimum description length must be 20'})
  @MaxLength(100, {message: 'Maximum description length must be 1024'})
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
  public photos!: string[];


  @IsBoolean({message: 'Premuim must be boolean value'})
  public premium!: boolean;

  @IsBoolean({message: 'Favorite must be boolean value'})
  public favorite!: boolean;

  @Min(1, {message: 'Minimum rating is 1'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating!: number;

  @IsEnum(HousingType, {message: 'Type must be one of: apartment, house, room, hotel'})
  public housingType!: HousingType;

  @Min(1, {message: 'Minimum room count is 1'})
  @Max(8, {message: 'Maximum room count is 8'})
  public roomCount!: number;

  @Min(1, {message: 'Minimum guest count is 1'})
  @Max(8, {message: 'Maximum guest count is 10'})
  public guestCount!: number;

  @Min(100, {message: 'Minimum price must be 100'})
  @Max(100000, {message: 'Maximum price must be 100 000'})
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
