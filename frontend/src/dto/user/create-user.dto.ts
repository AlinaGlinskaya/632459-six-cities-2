enum UserStatus {
  Common = 'Common',
  Pro = 'Pro'
}

export default class CreateUserDto {
  public userName!: string;

  public email!: string;

  public avatarPath!: string;

  public password!: string;

  public userStatus!: UserStatus;
}
