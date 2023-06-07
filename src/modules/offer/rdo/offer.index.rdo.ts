import { Expose } from 'class-transformer';
import { CityEnum } from '../../../types/city.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';

export default class OfferIndexRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  public city!: CityEnum;

  @Expose()
  public previewImage!: string;

  @Expose()
  public premiumFlag!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public price!: number;

  @Expose()
  public commentCount!: number;
}
