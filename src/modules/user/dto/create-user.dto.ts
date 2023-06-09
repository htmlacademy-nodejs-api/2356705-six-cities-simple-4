import { UserConstants } from '../../../types/constants.js';
import { UserType } from '../../../types/user-type.enum.js';
import { IsEmail, IsEnum, Length } from 'class-validator';

export default class CreateUserDto {
  @Length(UserConstants.MIN_NAME_LENGTH, UserConstants.MAX_NAME_LENGTH)
  public name!: string;

  @IsEmail()
  public email!: string;

  @IsEnum(UserType)
  public type!: UserType;

  @Length(UserConstants.MIN_PASSWORD_LENGTH, UserConstants.MAX_PASSWORD_LENGTH)
  public password!: string;
}
