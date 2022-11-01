import { MinLength, MaxLength, Min, Max, IsMongoId, IsInt } from 'class-validator';
import { CommentLength, CommentRating } from '../../../const.js';

export default class CreateCommentDto {
  @IsMongoId({message: 'offerId field must be valid id'})
  public offerId!: string;

  @MinLength(CommentLength.MIN, {message: `Minimum comment length must be ${CommentLength.MIN}`})
  @MaxLength(CommentLength.MAX, {message: `Maximum comment length must be ${CommentLength.MAX}`})
  public text!: string;

  @IsInt({message: 'Rating must be an integer'})
  @Min(CommentRating.MIN, {message: `Minimum rating is ${CommentRating.MIN}`})
  @Max(CommentRating.MAX, {message: `Maximum rating is ${CommentRating.MAX}`})
  public rating!: number;

  public authorId!: string;
}
