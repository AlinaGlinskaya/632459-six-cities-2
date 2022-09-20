import { Offer } from '../types/offer.type';
import { City } from '../types/city.enum';
import { HousingType } from '../types/housing-type.enum';
import { UserStatus } from '../types/user-status.enum';

const parseLocation = (location: string[]) => {
  const [latitude, longitude] = location;
  return {
    latitude: Number(latitude),
    longitude: Number(longitude)
  };
};

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('|');
  const [offerName,
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
    coordinates]= tokens;

  return {
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
    coordinates: parseLocation(coordinates.split(';')),
  } as Offer;
};

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';
