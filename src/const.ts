export enum WeekDay {
  FIRST = 1,
  LAST = 7
}

export enum Rating {
  MIN = 1,
  MAX = 5
}

export enum RoomCount {
  MIN = 1,
  MAX = 8
}

export enum GuestCount {
  MIN = 1,
  MAX = 10
}

export enum Price {
  MIN = 100,
  MAX = 100000
}

export enum UsernameLength {
  MIN = 1,
  MAX = 15
}

export enum PasswordLength {
  MIN = 6,
  MAX = 12
}

export enum CommentLength {
  MIN = 5,
  MAX = 1024
}

export enum CommentRating {
  MIN = 1,
  MAX = 5
}

export enum SortType {
  Down = -1,
  Up = 1
}

export enum OfferNameLength {
  MIN = 10,
  MAX = 100
}

export enum OfferDescriptionLength {
  MIN = 20,
  MAX = 1024
}

export const HOUSE_PHOTO_COUNT = 6;
export const OFFERS_LIMIT = 60;
export const COMMENTS_LIMIT = 50;
export const PREMIUM_OFFERS_LIMIT = 3;

export const JWT_ALGORITHM = 'HS256';
