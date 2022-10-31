import { User } from '../../types/user.type.js';
import { UserStatus } from '../../types/user-status.enum.js';
import { UsernameLength, PasswordLength } from '../../const.js';
import typegoose, { getModelForClass, defaultClasses } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor(data: User) {
    super();

    this.userName = data.userName;
    this.email = data.email;
    this.avatarPath = data.avatarPath;
    this.password = data.password;
    this.userStatus = data.userStatus;
  }

  @prop({required: true, trim: true, minlength: UsernameLength.MIN, maxlength: UsernameLength.MAX})
  public userName!: string;

  @prop({required: true, unique: true, match: /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,5})?$/})
  public email!: string;

  @prop()
  public avatarPath!: string;

  @prop({required: true, minlength: PasswordLength.MIN, maxlength: PasswordLength.MAX})
  public password!: string;

  @prop({required: true, enum: UserStatus})
  public userStatus!: UserStatus;

  @prop({required: true, type: [String]})
  public favorites!: string[];

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
