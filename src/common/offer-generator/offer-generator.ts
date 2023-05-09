import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserType } from '../../types/user-type.enum.js';
import { CityEnum } from '../../types/city.enum.js';
import { Comfort } from '../../types/comfort.enum.js';
import { generateRandomValue, getRandomItem, getRandomEnumKey, getRandomEnumKeys, getRandomFixItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;


export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomEnumKey(CityEnum);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const photos = getRandomFixItems<string>(this.mockData.photos, 6).join(';');
    const premiumFlag = getRandomItem<string>(['true','false']);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const type = getRandomEnumKey(OfferType);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const comfort = getRandomEnumKeys(Comfort).join(';');
    const userName = getRandomItem<string>(this.mockData.userNames);
    const avatarPath = getRandomItem<string>(this.mockData.avatarPaths);
    const email = getRandomItem<string>(this.mockData.emails);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userType = getRandomEnumKey(UserType);
    const coordinate = getRandomItem<string>(this.mockData.coordinates);

    const [latitude, longitude] = coordinate.split(',');

    return [
      title, description, createdDate, city,
      previewImage, photos, premiumFlag, rating,
      type, rooms, guests, price, comfort,
      userName, email, avatarPath, password, userType,
      latitude, longitude
    ].join('\t');
  }
}
