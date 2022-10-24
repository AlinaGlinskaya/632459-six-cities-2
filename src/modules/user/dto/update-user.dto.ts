import { IsString } from 'class-validator';

export default class UpdateUserDto {
  @IsString({message: 'userName must be a string'})
  public userName!: string;

  @IsString({message: 'avatarPath must be a string'})
  public avatarPath!: string;
}
