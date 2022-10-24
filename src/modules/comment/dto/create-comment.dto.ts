import { MinLength, MaxLength, Min, Max, IsMongoId, IsInt } from 'class-validator';

export default class CreateCommentDto {
  @IsMongoId({message: 'offerId field must be valid id'})
  public offerId!: string;

  @MinLength(5, {message: 'Minimum comment length must be 5'})
  @MaxLength(1024, {message: 'Maximum comment length must be 1024'})
  public text!: string;

  @IsInt({message: 'Rating must be an integer'})
  @Min(1, {message: 'Minimum rating is 1'})
  @Max(5, {message: 'Maximum rating is 5'})
  public rating!: number;

  @IsMongoId({message: 'offerId field must be valid id'})
  public authorId!: string;
}
