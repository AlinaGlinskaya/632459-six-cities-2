import { UserStatus } from '../../../types/user-status.enum.js';

export default class CreateUserDto {
  public userName!: string;
  public email!: string;
  public avatarPath!: string;
  public password!: string;
  public userStatus!: UserStatus;
}
