import {Expose} from 'class-transformer';
import { UserStatus } from '../../../types/user-status.enum.js';

export default class UserResponse {
  @Expose()
  public userName!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatarPath!: string;

  @Expose()
  public userStatus!: UserStatus;
}
