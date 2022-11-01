import { UserStatus } from '../../../types/user-status.enum.js';
import { IsString, IsEmail, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
import { UsernameLength, PasswordLength } from '../../../const.js';

export default class CreateUserDto {
  @IsString({message: 'userName is required'})
  @MinLength(UsernameLength.MIN, {message: `Minimum username length must be ${UsernameLength.MIN}`})
  @MaxLength(UsernameLength.MAX, {message: `Maximum username length must be ${UsernameLength.MAX}`})
  public userName!: string;

  @IsEmail({}, {message: 'email must be a valid address'})
  public email!: string;

  @IsOptional()
  public avatarPath!: string;

  @IsString({message: 'password is required and must be a string'})
  @MinLength(PasswordLength.MIN, {message: `Minimum password length muxt be ${PasswordLength.MIN}`})
  @MaxLength(PasswordLength.MAX, {message: `Maximum password length must be ${PasswordLength.MAX}`})
  public password!: string;

  @IsEnum(UserStatus, {message: 'User status must be Common or Pro'})
  public userStatus!: UserStatus;
}
