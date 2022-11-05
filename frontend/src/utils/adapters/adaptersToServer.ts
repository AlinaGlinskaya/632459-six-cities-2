import CreateUserDto from '../../dto/user/create-user.dto';
import { UserRegister } from '../../types/types';

export enum UserStatus {
  Common = 'Common',
  Pro = 'Pro'
}

export const adaptSignUpToServer = (user: UserRegister): CreateUserDto => ({
  userName: user.name,
  email: user.email,
  password: user.password,
  avatarPath: '',
  userStatus: user.isPro ? UserStatus.Pro : UserStatus.Common
});
