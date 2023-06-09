export const DEFAULT_STATIC_IMAGES = [
  'default-avatar.jpg',
  'default-preview.jpg',
];

export const STATIC_RESOURCE_FIELDS = [
  'avatarPath',
  'image'
];

export const UPLOAD_IMAGE_EXTENSIONS = [
  'jpg',
  'png'
];

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
  DEFAULT_PREVIEW_FILE_NAME: 'default-preview.jpg',
};
export const OfferMessages = {
  ERROR_RATING_PRECISION: `$property must be an number with precision is ${OfferConstants.RATING_PRECISION}`,
};

export const UserConstants = {
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 15,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 12,
  JWT_ALGORITHM: 'HS256',
  DEFAULT_AVATAR_FILE_NAME: 'default-avatar.jpg',
};

export const CommentConstants = {
  MIN_TEXT_LENGTH: 5,
  MAX_TEXT_LENGTH: 1024,
  DEFAULT_COMMENTS_COUNT: 60,
};
