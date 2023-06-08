import { Type } from 'class-transformer';
import { CityEnum } from '../../../types/city.enum.js';
import { Comfort } from '../../../types/comfort.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { IsArray, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsBoolean, IsNumber, ArrayMinSize, ArrayMaxSize, ArrayUnique, IsObject, ValidateNested, IsString, IsOptional } from 'class-validator';
import { Coordinates } from './coordinates.dto.js';
import { OfferConstants, OfferMessages } from '../../../types/constants.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(OfferConstants.MIN_NAME_LENGTH)
  @MaxLength(OfferConstants.MAX_NAME_LENGTH)
  public title?: string;

  @IsOptional()
  @MinLength(OfferConstants.MIN_DESCRIPTION_LENGTH)
  @MaxLength(OfferConstants.MAX_DESCRIPTION_LENGTH)
  public description?: string;

  @IsOptional()
  @IsEnum(CityEnum)
  public city?: CityEnum;

  @IsOptional()
  @IsString()
  public previewImage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(OfferConstants.PHOTOS_ARRAY_SIZE)
  @ArrayMaxSize(OfferConstants.PHOTOS_ARRAY_SIZE)
  public photos?: string[];

  @IsOptional()
  @IsBoolean()
  public premiumFlag?: boolean;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: OfferConstants.RATING_PRECISION }, { message: OfferMessages.ERROR_RATING_PRECISION })
  @Min(OfferConstants.MIN_RATING)
  @Max(OfferConstants.MAX_RATING)
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType)
  public type?: OfferType;

  @IsOptional()
  @IsInt()
  @Min(OfferConstants.MIN_ROOMS)
  @Max(OfferConstants.MAX_ROOMS)
  public rooms?: number;

  @IsOptional()
  @IsInt()
  @Min(OfferConstants.MIN_GUESTS)
  @Max(OfferConstants.MAX_GUESTS)
  public guests?: number;

  @IsOptional()
  @IsInt()
  @Min(OfferConstants.MIN_PRICE)
  @Max(OfferConstants.MAX_PRICE)
  public price?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(Comfort)
  @ArrayUnique()
  public comforts?: Comfort[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Coordinates)
  public coordinates?: Coordinates;
}
