export const OfferConstants = {
  MIN_NAME_LENGTH: 10,
  MAX_NAME_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 20,
  MAX_DESCRIPTION_LENGTH: 1024,
  PHOTOS_ARRAY_SIZE: 6,
  MIN_RATING: 1,
  MAX_RATING: 5,
  RATING_PRECISION: 1,
  MIN_ROOMS: 1,
  MAX_ROOMS: 8,
  MIN_GUESTS: 1,
  MAX_GUESTS: 10,
  MIN_PRICE: 100,
  MAX_PRICE: 100_000,
  DEFAULT_OFFERS_COUNT: 60,
};
export const OfferMessages = {
  ERROR_RATING_PRECISION: `$property must be an number with precision is ${OfferConstants.RATING_PRECISION}`,
};

export const UserConstants = {
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 15,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 12,
  JWT_ALGORITHM: 'HS256'
};

export const CommentConstants = {
  MIN_TEXT_LENGTH: 5,
  MAX_TEXT_LENGTH: 1024,
};
