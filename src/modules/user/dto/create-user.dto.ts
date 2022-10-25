import { UserStatus } from '../../../types/user-status.enum.js';
import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export default class CreateUserDto {
  @IsString({message: 'userName is required'})
  public userName!: string;

  @IsEmail({}, {message: 'email must be a valid address'})
  public email!: string;

  @IsOptional()
  public avatarPath!: string;

  @IsString({message: 'password is required and must be a string'})
  public password!: string;

  @IsEnum(UserStatus, {message: 'User status must be Common or Pro'})
  public userStatus!: UserStatus;
}
