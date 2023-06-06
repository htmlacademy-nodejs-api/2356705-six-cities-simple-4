import { Type } from 'class-transformer';
import { CityEnum } from '../../../types/city.enum.js';
import { Comfort } from '../../../types/comfort.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { IsArray, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, IsBoolean, IsNumber, ArrayMinSize, ArrayMaxSize, ArrayUnique, IsObject, ValidateNested, IsString } from 'class-validator';
import { Coordinates } from './coordinates.dto.js';
import { OfferConstants, OfferMessages } from '../../../types/constants.js';


export default class CreateOfferDto {
  @MinLength(OfferConstants.MIN_NAME_LENGTH)
  @MaxLength(OfferConstants.MAX_NAME_LENGTH)
  public title!: string;

  @MinLength(OfferConstants.MIN_DESCRIPTION_LENGTH)
  @MaxLength(OfferConstants.MAX_DESCRIPTION_LENGTH)
  public description!: string;

  @IsDateString()
  public postDate!: Date;

  @IsEnum(CityEnum)
  public city!: CityEnum;

  @IsString()
  public previewImage!: string;

  @IsArray()
  @ArrayMinSize(OfferConstants.PHOTOS_ARRAY_SIZE)
  @ArrayMaxSize(OfferConstants.PHOTOS_ARRAY_SIZE)
  public photos!: string[];

  @IsBoolean()
  public premiumFlag!: boolean;

  @IsNumber({ maxDecimalPlaces: OfferConstants.RATING_PRECISION }, { message: OfferMessages.ERROR_RATING_PRECISION })
  @Min(OfferConstants.MIN_RATING)
  @Max(OfferConstants.MAX_RATING)
  public rating!: number;

  @IsEnum(OfferType)
  public type!: OfferType;

  @IsInt()
  @Min(OfferConstants.MIN_ROOMS)
  @Max(OfferConstants.MAX_ROOMS)
  public rooms!: number;

  @IsInt()
  @Min(OfferConstants.MIN_GUESTS)
  @Max(OfferConstants.MAX_GUESTS)
  public guests!: number;

  @IsInt()
  @Min(OfferConstants.MIN_PRICE)
  @Max(OfferConstants.MAX_PRICE)
  public price!: number;

  @IsArray()
  @IsEnum(Comfort, { each: true })
  @ArrayUnique()
  public comforts!: Comfort[];

  @IsObject()
  @ValidateNested()
  @Type(() => Coordinates)
  public coordinates!: Coordinates;

  @IsMongoId()
  public userId!: string;
}
