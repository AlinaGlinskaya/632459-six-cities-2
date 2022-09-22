import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems, shuffleArray } from '../../utils/random.js';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import dayjs from 'dayjs';
import { UserStatus } from '../../types/user-status.enum.js';
import { WeekDay, Rating, RoomCount, GuestCount, Price, HOUSE_PHOTO_COUNT } from '../../const.js';

export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const offerName = getRandomItem<string>(this.mockData.offerNames);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const date = dayjs().subtract(generateRandomValue(WeekDay.FIRST, WeekDay.LAST), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.photos);
    const photos = shuffleArray(this.mockData.photos).slice(0, HOUSE_PHOTO_COUNT);
    const premium = Boolean(Math.random() < 0.5);
    const favorite = Boolean(Math.random() < 0.5);
    const rating = generateRandomValue(Rating.MIN, Rating.MAX, 1).toString();
    const housingType = getRandomItem<string>(this.mockData.housingTypes);
    const roomCount = generateRandomValue(RoomCount.MIN, RoomCount.MAX).toString();
    const guestCount = generateRandomValue(GuestCount.MIN, GuestCount.MAX).toString();
    const price = generateRandomValue(Price.MIN, Price.MAX).toString();
    const conveniences = getRandomItems<string>(this.mockData.conveniences).join(';');
    const userName = getRandomItem<string>(this.mockData.userNames);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userStatus = getRandomItem([UserStatus.Common, UserStatus.Pro]);
    const latitude = getRandomItem<string>(this.mockData.latitudes);
    const longitude = getRandomItem<string>(this.mockData.longitudes);
    const coordinates = [latitude, longitude].join(';');

    return [
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
      avatar,
      password,
      userStatus,
      coordinates]
      .join('|');
  }
}
