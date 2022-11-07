import CreateOfferDto from '../../dto/offer/create-offer.dto';
import CreateUserDto from '../../dto/user/create-user.dto';
import { NewComment, NewOffer, UserRegister } from '../../types/types';
import CreateCommentDto from '../../dto/comment/create-comment.dto';

export enum UserStatus {
  Common = 'Common',
  Pro = 'Pro'
}

export const adaptSignUpToServer = (user: UserRegister): CreateUserDto => ({
  userName: user.name,
  email: user.email,
  password: user.password,
  avatarPath: '',
  userStatus: user.isPro ? UserStatus.Pro : UserStatus.Common
});

export const adaptOfferToServer = (offer: NewOffer): CreateOfferDto => ({
  offerName: offer.title,
  description: offer.description,
  date: new Date(),
  city: offer.city.name,
  preview: offer.previewImage,
  premium: offer.isPremium,
  rating: 1,
  housingType: offer.type,
  roomCount: offer.bedrooms,
  guestCount: offer.maxAdults,
  price: offer.price,
  conveniences: offer.goods,
  coordinates: {
    latitude: offer.location.latitude,
    longitude: offer.location.longitude
  }
});

export const adaptCommentsToServer = (newComment: NewComment): CreateCommentDto => ({
  offerId: newComment.offerId,
  text: newComment.comment,
  rating: newComment.rating,
});
