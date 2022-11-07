import { User } from '../../types/types';

export default class CommentDto {
  public id!: string;

  public author!: User;

  public date!: string;

  public rating!: number;

  public text!: string;
}
