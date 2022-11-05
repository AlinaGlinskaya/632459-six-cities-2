import OfferDto from '../../dto/offer/offer.dto';
import UserDto from '../../dto/user/user.dto';
import { Offer, Type, User } from '../../types/types';

export const adaptOffersToClient = (offers: OfferDto[]): Offer[] => offers.map((offer: OfferDto) => ({
  id: offer._id,
  price: offer.price,
  rating: offer.rating,
  title: offer.offerName,
  isPremium: offer.premium,
  isFavorite: offer.favorite,
  city: {
    name: offer.city,
    location: offer.coordinates
  },
  location: offer.coordinates,
  previewImage: offer.preview,
  type: offer.housingType as unknown as Type,
  bedrooms: offer.roomCount,
  description: offer.description,
  goods: offer.conveniences,
  host: adaptUserToClient(offer.author),
  images: offer.photos,
  maxAdults: offer.guestCount
}));

export const adaptOfferToClient = (offer: OfferDto): Offer => ({
  id: offer._id,
  price: offer.price,
  rating: offer.rating,
  title: offer.offerName,
  isPremium: offer.premium,
  isFavorite: offer.favorite,
  city: {
    name: offer.city,
    location: offer.coordinates
  },
  location: offer.coordinates,
  previewImage: offer.preview,
  type: offer.housingType as unknown as Type,
  bedrooms: offer.roomCount,
  description: offer.description,
  goods: offer.conveniences,
  host: adaptUserToClient(offer.author),
  images: offer.photos,
  maxAdults: offer.guestCount
});

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.userName,
  avatarUrl: user.avatarPath,
  isPro: true,
  email: user.email
});

