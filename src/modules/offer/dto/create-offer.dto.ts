import { CityEnum } from '../../../types/city.enum.js';
import { Comfort } from '../../../types/comfort.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';
import { OfferType } from '../../../types/offer-type.enum.js';

export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: Date;
  public city!: CityEnum;
  public previewImage!: string;
  public photos!: string[];
  public premiumFlag!: boolean;
  public rating!: number;
  public type!: OfferType;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public comfort!: Comfort[];
  public coordinates!: Coordinates;
  public userId!: string;
}
