import { CityEnum } from '../../../types/city.enum';
import { Comfort } from '../../../types/comfort.enum';
import { Coordinates } from '../../../types/coordinates.type';
import { OfferType } from '../../../types/offer-type.enum';

export default class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public city?: CityEnum;
  public previewImage?: string;
  public photos?: string[];
  public premiumFlag?: boolean;
  public rating?: number[];
  public type?: OfferType;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public comfort?: Comfort[];
  public coordinates?: Coordinates;
}
