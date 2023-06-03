import { Type } from 'class-transformer';
import { CityEnum } from '../../../types/city.enum.js';
import { Comfort } from '../../../types/comfort.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { IsArray, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsBoolean, IsNumber, ArrayMinSize, ArrayMaxSize, ArrayUnique, IsObject, ValidateNested, IsLatitude, IsLongitude, IsString, IsOptional } from 'class-validator';

class Coordinates {
  @IsString({ message: 'Field latitude must be string' })
  @IsLatitude({ message: 'Field latitude must be valid' })
  latitude!: string;

  @IsString({ message: 'Field longitude must be string' })
  @IsLongitude({ message: 'Field longitude must be valid' })
  longitude!: string;
}

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: 'Minimum title length must be 10' })
  @MaxLength(100, { message: 'Maximum title length must be 100' })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: 'Minimum description length must be 20' })
  @MaxLength(1024, { message: 'Maximum description length must be 1024' })
  public description?: string;

  @IsOptional()
  @IsEnum(CityEnum, { message: 'Field city must be Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf' })
  public city?: CityEnum;

  @IsOptional()
  @IsString({ message: 'Field name is required' })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: 'Field photos must be an array' })
  @ArrayMinSize(6, { message: 'Maximum photos is 6' })
  @ArrayMaxSize(6, { message: 'Maximum photos is 6' })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: 'Field premiumFlag must be an boolean' })
  public premiumFlag?: boolean;

  @IsOptional()
  @IsArray({ message: 'Field rating must be an array' })
  @IsNumber({ maxDecimalPlaces: 1 }, { each: true, message: 'Field rating must be an number with maxDecimalPlaces is 1' })
  @Min(1, { each: true, message: 'Minimum rating is 1' })
  @Max(5, { each: true, message: 'Maximum rating is 5' })
  public rating?: number[];

  @IsOptional()
  @IsEnum(OfferType, { message: 'Field rtype must be apartment, house, room, hotel' })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: 'Field rooms must be an integer' })
  @Min(1, { message: 'Minimum rooms is 1' })
  @Max(8, { message: 'Maximum rooms is 8' })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: 'Field guests must be an integer' })
  @Min(1, { message: 'Minimum guests is 1' })
  @Max(10, { message: 'Maximum guests is 10' })
  public guests?: number;

  @IsOptional()
  @IsInt({ message: 'Field price must be an integer' })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(100000, { message: 'Maximum price is 100000' })
  public price?: number;

  @IsOptional()
  @IsArray({ message: 'Field comfort must be an array' })
  @IsEnum(Comfort, { each: true, message: 'Field comfort must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels, Fridge' })
  @ArrayUnique({ message: 'Field comfort must be contain unique item' })
  public comfort?: Comfort[];

  @IsOptional()
  @IsObject({ message: 'Field coordinates must be object' })
  @ValidateNested()
  @Type(() => Coordinates)
  public coordinates?: Coordinates;
}
