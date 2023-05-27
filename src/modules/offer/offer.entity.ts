import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { CityEnum } from '../../types/city.enum.js';
import { Comfort } from '../../types/comfort.enum.js';
import { Coordinates } from '../../types/coordinates.type.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({ required: true })
  public postDate!: Date;

  @prop({
    city: () => String,
    enum: CityEnum,
    required: true
  })
  public city!: CityEnum;

  @prop({ trim: true, required: true })
  public previewImage!: string;

  @prop({ required: true })
  public photos!: string[];

  @prop({ required: true })
  public premiumFlag!: boolean;

  @prop({ required: true })
  public rating!: number[];

  @prop({
    type: () => String,
    enum: OfferType,
    required: true
  })
  public type!: OfferType;

  @prop({ required: true })
  public rooms!: number;

  @prop({ required: true })
  public guests!: number;

  @prop({ required: true })
  public price!: number;

  @prop({
    type: () => String,
    required: true,
    enum: Comfort
  })
  public comfort!: Comfort[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentCount!: number;

  @prop()
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
