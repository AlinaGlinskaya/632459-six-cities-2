enum UserStatus {
  Common = 'Common',
  Pro = 'Pro'
}

export default class UserDto {
  public userName!: string;

  public email!: string;

  public avatarPath!: string;

  public userStatus!: UserStatus;
}
