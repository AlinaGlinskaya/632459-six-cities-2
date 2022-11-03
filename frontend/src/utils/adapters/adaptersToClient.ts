import OfferDto from '../../dto/offer/offer.dto';
import { Offer, Type } from '../../types/types';

export const adaptOffersToClient = (offers: OfferDto[]): Offer[] => offers.map((offer: OfferDto) => ({
  id: offer._id,
  price: offer.price,
  rating: offer.rating,
  title: offer.offerName,
  isPremium: offer.premium,
  isFavorite: offer.favorite,
  city: {
    name: 'Cologne',
    location: {latitude: 50.938361, longitude: 6.959974}
  },
  location: offer.coordinates,
  previewImage: offer.preview,
  type: offer.housingType as unknown as Type,
  bedrooms: offer.roomCount,
  description: offer.description,
  goods: offer.conveniences,
  host: {
    name: 'g',
    avatarUrl: '',
    isPro: false,
    email: ''
  },
  images: offer.photos,
  maxAdults: offer.guestCount
}));
