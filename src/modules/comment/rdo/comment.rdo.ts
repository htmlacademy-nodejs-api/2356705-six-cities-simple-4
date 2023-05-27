import { Expose, Type } from 'class-transformer';
import OfferRdo from '../../offer/rdo/offer.rdo';
import UserRdo from '../../user/rdo/user.rdo';

export default class CoomentRdo {
  @Expose()
  public id!: string;

  @Expose()
  public text!: string;

  @Expose({ name: 'offerId' })
  @Type(() => OfferRdo)
  public offer!: OfferRdo;

  @Expose({ name: 'userId' })
  @Type(() => UserRdo)
  public user!: UserRdo;
}
