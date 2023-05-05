import { Comfort } from './comfort.enum.js';
import { OfferType } from './offer-type.enum.js';
import { CityEnum } from './city.enum.js';
import { User } from './user.type.js';
import { Coordinates } from './coordinates.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: CityEnum;
  previewImage: string;
  photos: string[];
  premiumFlag: boolean;
  rating: number;
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  comfort: Comfort[];
  user: User;
  comments: string[];
  coordinates: Coordinates;
}
