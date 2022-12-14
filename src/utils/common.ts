import { Offer } from '../types/offer.type.js';
import { City } from '../types/city.enum.js';
import { HousingType } from '../types/housing-type.enum.js';
import { UserStatus } from '../types/user-status.enum.js';
import crypto from 'crypto';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces/class-constructor.type.js';
import * as jose from 'jose';

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
    rating: Number.parseFloat(rating),
    housingType: housingType as HousingType,
    roomCount: Number.parseInt(roomCount, 10),
    guestCount: Number.parseInt(guestCount, 10),
    price: Number.parseInt(price, 10),
    conveniences: conveniences.split(';')
      .map((conv) => (conv)),
    author: {userName, email, avatarPath, password, userStatus: userStatus as UserStatus},
    coordinates: parseLocation(coordinates.split(';')),
  } as Offer;
};

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';

export const createSHA256 = (password: string, salt: string) => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(password).digest('hex');
};

export const fillDTO = <T, V>(responseObject: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(responseObject, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (message: string) => ({
  error: message,
});

export const setUcFirst = (str: string) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

export const createJWT = async (algorithm: string, jwtSecret: string, payload: object): Promise<string> => {
  const token = new jose.SignJWT({...payload})
    .setProtectedHeader({alg: algorithm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

  return token;
};
