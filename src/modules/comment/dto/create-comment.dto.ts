export default class CreateCommentDto {
  public offerId!: string;
  public text!: string;
  public date!: Date;
  public rating!: number;
  public authorId!: string;
}