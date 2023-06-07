import { Expose, Type } from 'class-transformer';
import { CityEnum } from '../../../types/city.enum.js';
import { OfferType } from '../../../types/offer-type.enum.js';
import { Comfort } from '../../../types/comfort.enum.js';
import { Coordinates } from '../../../types/coordinates.type.js';
import UserRdo from '../../user/rdo/user.rdo.js';

export default class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: Date;

  @Expose()
  public city!: CityEnum;

  @Expose()
  public previewImage!: string;

  @Expose()
  public photos!: string[];

  @Expose()
  public premiumFlag!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public rooms!: number;

  @Expose()
  public guests!: number;

  @Expose()
  public price!: number;

  @Expose()
  public comforts!: Comfort[];

  @Expose()
  public coordinates!: Coordinates;

  @Expose()
  public commentCount!: number;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user!: UserRdo;
}
