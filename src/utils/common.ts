import { OfferType } from '../types/offer-type.enum.js';
import { UserType } from '../types/user-type.enum.js';
import { CityEnum } from '../types/city.enum.js';
import { Offer } from '../types/offer.type.js';
import { Comfort } from '../types/comfort.enum.js';
import crypto from 'node:crypto';
import { plainToInstance, ClassConstructor } from 'class-transformer';

export const createOffer = (row: string) => {
  const tokens = row.replace('\r', '').replace('\n', '').split('\t');
  const [title, description, createdDate, city, previewImage, photos, premiumFlag, rating, type, rooms, guests, price, comfort, userName, email, avatarPath, password, userType, latitude, longitude] = tokens;
  return {
    title,
    description,
    postDate: new Date(createdDate),
    city: CityEnum[city as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
    previewImage,
    photos: photos.split(';'),
    premiumFlag: (premiumFlag?.toLowerCase?.() === 'true'),
    rating: Math.floor(parseFloat(rating.replace(',', '.')) * 10) / 10,
    type: OfferType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    comfort: comfort.split(';')
      .map((oneComfort) => (Comfort[oneComfort as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge'])),
    user: { name: userName, email, avatarPath, password, type: UserType[userType as 'Pro' | 'Basic'] },
    comments: [],
    coordinates: { latitude, longitude },
  } as Offer;
};

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};
