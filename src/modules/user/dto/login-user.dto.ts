import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';
import { PasswordLength } from '../../../const.js';

export default class LoginUserDto {
  @IsEmail({}, {message: 'email must be a valid address'})
  public email!: string;

  @IsString({message: 'password is required and must be a string'})
  @MinLength(PasswordLength.MIN, {message: `Minimum password length muxt be ${PasswordLength.MIN}`})
  @MaxLength(PasswordLength.MAX, {message: `Maximum password length must be ${PasswordLength.MAX}`})
  public password!: string;
}
