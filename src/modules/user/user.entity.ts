import { User } from '../../types/user.type';
import { UserStatus } from '../../types/user-status.enum';
import { UsernameLength, PasswordLength } from '../../const.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

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

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const userModel = getModelForClass(UserEntity);
