import { IsEmail, IsNotEmpty } from 'class-validator';

export default class LoginUserDto {
  @IsEmail()
  public email!: string;

  @IsNotEmpty()
  public password!: string;
}
