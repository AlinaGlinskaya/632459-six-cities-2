import { User } from '../../types/user.type';
import { UserStatus } from '../../types/user-status.enum';
import { UsernameLength, PasswordLength } from '../../const.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';

const {prop} = typegoose;

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, minlength: UsernameLength.MIN, maxlength: UsernameLength.MAX})
  public userName!: string;

  @prop({required: true, unique: true, match: /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/})
  public email!: string;

  @prop()
  public avatarPath!: string;

  @prop({required: true, minlength: PasswordLength.MIN, maxlength: PasswordLength.MAX})
  public password!: string;

  @prop({required: true, enum: UserStatus})
  public userStatus!: UserStatus;
}

export const userModel = getModelForClass(UserEntity);
