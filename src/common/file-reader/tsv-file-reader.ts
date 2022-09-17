import { readFileSync } from 'fs';
import { City } from '../../types/city.enum.js';
import { HousingType } from '../../types/housing-type.enum.js';
import { Offer } from '../../types/offer.type.js';
import { UserStatus } from '../../types/user-status.enum.js';
import { FileReader } from './file-reader.interface.js';

export default class TSVFileReader implements FileReader {
  constructor(public filename: string) {}

  private rawData = '';

  private parseLocation(location: string[]) {
    const [latitude, longitude] = location;
    return {
      latitude: Number(latitude),
      longitude: Number(longitude)
    };
  }

  public read() {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row !== '')
      .map((line) => line.split('|'))
      .map(([
        offerName,
        description,
        date,
        city,
        preview,
        photos,
        premium,
        favorite,
        rating,
        housingType,
        roomCount,
        guestCount,
        price,
        conveniences,
        userName,
        email,
        avatarPath,
        password,
        userStatus,
        coordinates
      ]) => ({
        offerName,
        description,
        date: new Date(date),
        city: city as City,
        preview,
        photos: photos.split(';')
          .map((photo) => photo),
        premium: JSON.parse(premium),
        favorite: JSON.parse(favorite),
        rating: Number.parseFloat(rating),
        housingType: housingType as HousingType,
        roomCount: Number.parseInt(roomCount, 10),
        guestCount: Number.parseInt(guestCount, 10),
        price: Number.parseInt(price, 10),
        conveniences: conveniences.split(';')
          .map((name) => ({name})),
        author: {userName, email, avatarPath, password, userStatus: userStatus as UserStatus},
        coordinates: this.parseLocation(coordinates.split(';')),
      }));
  }

}
