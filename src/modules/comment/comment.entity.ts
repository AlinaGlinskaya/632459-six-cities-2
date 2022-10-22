import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { CommentLength, CommentRating } from '../../const.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';

const {prop, modelOptions} = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments'
  }
})

export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({required: true, ref: OfferEntity})
  public offerId!: string;

  @prop({required: true, trim: true, minlength: CommentLength.MIN, maxlength: CommentLength.MAX})
  public text!: string;

  @prop({required: true})
  public date!: string;

  @prop({required: true, min: CommentRating.MIN, max: CommentRating.MAX})
  public rating!: number;

  @prop({required: true, ref: UserEntity})
  public authorId!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
