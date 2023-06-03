import { UserType } from '../../../types/user-type.enum.js';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

export default class CreateUserDto {
  @IsString({ message: 'Field name is required' })
  @Length(1, 15, { message: 'Min length for name is 1, max is 15' })
  public name!: string;

  @IsEmail({}, { message: 'Field email must be valid address' })
  public email!: string;

  public avatarPath!: string;

  @IsString({ message: 'Field type is required' })
  @IsEnum(UserType, { message: 'Field type must be pro or обычный' })
  public type!: UserType;

  @IsString({ message: 'Field password is required' })
  @Length(6, 12, { message: 'Min length for password is 6, max is 12' })
  public password!: string;
}
