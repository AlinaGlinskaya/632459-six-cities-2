import { UserStatus } from './user-status.enum';

export type User = {
  userName: string,
  email: string,
  avatarPath: string,
  password: string,
  userStatus: UserStatus
}
