import { readFileSync } from 'node:fs';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserType } from '../../types/user-type.enum.js';
import { CityEnum } from '../../types/city.enum.js';
import { Offer } from '../../types/offer.type.js';
import { Comfort } from '../../types/comfort.enum.js';
import { FileReaderInterface } from './file-reader.interface.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate,, previewImage, photos, premiumFlag, rating, type, rooms, guests,price,comfort,userName,email,avatarPath,password,,latitude,longitude]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city: CityEnum[type as 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
        previewImage,
        photos: photos.split(';'),
        premiumFlag:(premiumFlag?.toLowerCase?.() === 'true'),
        rating: Number.parseInt(rating, 10),
        type: OfferType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
        rooms: Number.parseInt(rooms, 10),
        guests: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        comfort: comfort.split(';')
          .map(() => (Comfort[type as 'Breakfast' | 'AirConditioning' | 'LaptopFriendlyWorkspace' | 'BabySeat' | 'Washer' | 'Towels' | 'Fridge'])),
        user: {name:userName,email, avatarPath, password, type: UserType[type as 'Pro' | 'Basic']},
        comments: [],
        coordinates: {latitude, longitude},
      }));
  }
}
