import { IsLatitude, IsString, IsLongitude } from 'class-validator';

export class Coordinates {
  @IsString()
  @IsLatitude()
    latitude!: string;

  @IsString()
  @IsLongitude()
    longitude!: string;
}
