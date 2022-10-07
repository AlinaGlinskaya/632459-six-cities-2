import { UserStatus } from './user-status.enum.js';

export type User = {
  userName: string,
  email: string,
  avatarPath: string,
  password: string,
  userStatus: UserStatus
}
