import { IsMongoId, IsString, Length } from 'class-validator';

export default class CreateCommentDto {
  @IsString({ message: 'Field text is required' })
  @Length(5, 1024, { message: 'Field text is min length is 5, max is 1024' })
  public text!: string;

  @IsMongoId({ message: 'Field offerId field must be a valid id' })
  public offerId!: string;

  @IsMongoId({ message: 'Field userId field must be a valid id' })
  public userId!: string;
}
