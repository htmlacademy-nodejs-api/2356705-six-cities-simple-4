import dayjs from 'dayjs';
import { MockData } from '../../types/mock-data.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserType } from '../../types/user-type.enum.js';
import { CityEnum } from '../../types/city.enum.js';
import { Comfort } from '../../types/comfort.enum.js';
import { generateRandomValue, getRandomItem, getRandomEnumKey, getRandomEnumKeys, getRandomItems } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { OfferConstants } from '../../types/constants.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomEnumKey(CityEnum);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const photos = getRandomItems<string>(this.mockData.photos, OfferConstants.PHOTOS_ARRAY_SIZE).join(';');
    const premiumFlag = getRandomItem<string>(['true', 'false']);
    const rating = generateRandomValue(OfferConstants.MIN_RATING, OfferConstants.MAX_RATING, OfferConstants.RATING_PRECISION).toString();
    const type = getRandomEnumKey(OfferType);
    const rooms = generateRandomValue(OfferConstants.MIN_ROOMS, OfferConstants.MAX_ROOMS).toString();
    const guests = generateRandomValue(OfferConstants.MIN_GUESTS, OfferConstants.MAX_GUESTS).toString();
    const price = generateRandomValue(OfferConstants.MIN_PRICE, OfferConstants.MAX_PRICE).toString();
    const comforts = getRandomEnumKeys(Comfort).join(';');
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
      type, rooms, guests, price, comforts,
      userName, email, avatarPath, password, userType,
      latitude, longitude
    ].join('\t');
  }
}
