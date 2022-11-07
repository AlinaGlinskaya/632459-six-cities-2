import OfferDto from '../../dto/offer/offer.dto';
import UserDto from '../../dto/user/user.dto';
import { Comment, Offer, Type, User } from '../../types/types';
import CommentDto from '../../dto/comment/comment.dto';

export const adaptOffersToClient = (offers: OfferDto[]): Offer[] => offers.map((offer: OfferDto) => ({
  id: offer.id,
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
  id: offer.id,
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

export const adaptCommentsToClient = (comment: CommentDto): Comment => ({
  id: comment.id,
  comment: comment.text,
  date: comment.date,
  rating: comment.rating,
  user: comment.author,
});
