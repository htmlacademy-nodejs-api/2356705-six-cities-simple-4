import { inject, injectable } from 'inversify';
import CreateOfferDto from './dto/create-offer.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { Component } from '../../types/component.types.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import UpdateOfferDto from './dto/update-offer.dto.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .populate(['userId'])
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.offerModel
      .deleteMany({ offerId })
      .exec();

    return result.deletedCount;
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentCount: 1,
        }
      }).exec();
  }

  // TODO Расчет рейтинга 
  // public async calcRaiting(offerId: string): Promise<DocumentType<OfferEntity> | null> {
  //   return this.offerModel
  //     .aggregate([
  //       {
  //         $group:
  //         {
  //           _id: '$offerId',
  //           avgRaiting: { $avg: '$raiting' }
  //         }
  //       }
  //     ]).exec();
  // }
}
