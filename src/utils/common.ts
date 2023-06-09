import { OfferType } from '../types/offer-type.enum.js';
import { UserType } from '../types/user-type.enum.js';
import { CityEnum } from '../types/city.enum.js';
import { Offer } from '../types/offer.type.js';
import { Comfort } from '../types/comfort.enum.js';
import crypto from 'node:crypto';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import * as jose from 'jose';
import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../types/validation-error-field.type.js';
import { ServiceError } from '../types/service-error.enum.js';
import { UnknownRecord } from '../types/unknown-record.type.js';
import { DEFAULT_STATIC_IMAGES } from '../types/constants.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\r', '').replace('\n', '').split('\t');
  const [title, description, createdDate, city, previewImage, photos, premiumFlag, rating, type, rooms, guests, price, comforts, userName, email, avatarPath, password, userType, latitude, longitude] = tokens;
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
    comforts: comforts.split(';')
      .map((oneComfort) => (Comfort[oneComfort as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge'])),
    user: { name: userName, email, avatarPath, password, type: UserType[userType as 'Pro' | 'Basic'] },
    comments: [],
    coordinates: { latitude, longitude },
  } as Offer;
};

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) {
  return {
    errorType: serviceError,
    message,
    details: [...details],
  };
}

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export async function createJWT(algorithm: string, jwtSecret: string, payload: object): Promise<string> {
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));
}

export function transformErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}

function isObject(value: unknown) {
  return typeof value === 'object' && value !== null;
}

export function transformProperty(
  property: string,
  someObject: UnknownRecord,
  transformFn: (object: UnknownRecord) => void
) {
  return Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownRecord, transformFn);
      }
    });
}

export function transformObject(properties: string[], staticPath: string, uploadPath: string, data: UnknownRecord) {
  return properties
    .forEach((property) => {
      transformProperty(property, data, (target: UnknownRecord) => {
        const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
        target[property] = `${rootPath}/${target[property]}`;
      });
    });
}
