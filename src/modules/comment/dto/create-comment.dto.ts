import { IsMongoId, IsNumber, Length, Max, Min } from 'class-validator';
import { CommentConstants, OfferConstants, OfferMessages } from '../../../types/constants.js';

export default class CreateCommentDto {
  @Length(CommentConstants.MIN_TEXT_LENGTH, CommentConstants.MAX_TEXT_LENGTH)
  public text!: string;

  @IsNumber({ maxDecimalPlaces: OfferConstants.RATING_PRECISION }, { message: OfferMessages.ERROR_RATING_PRECISION })
  @Min(OfferConstants.MIN_RATING)
  @Max(OfferConstants.MAX_RATING)
  public rating!: number;

  @IsMongoId()
  public offerId!: string;

  public userId!: string;
}
