enum UserStatus {
  Common = 'Common',
  Pro = 'Pro'
}

export default class UserWithTokenDto {
  public userName!: string;

  public email!: string;

  public avatarPath!: string;

  public userStatus!: UserStatus;

  public token!: string;
}
