import { DocumentType } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto.js';
import UpdateUserDto from './dto/update-user.dto.js';
import { UserEntity } from './user.entity.js';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findById(userId: string): Promise <DocumentType<UserEntity> | null>;
  findByEmail(email: string): Promise <DocumentType<UserEntity> | null>;
  updateById(userId: string, dto: UpdateUserDto): Promise <DocumentType<UserEntity> | null>;
  findFavoritesIds(userId: string): Promise<DocumentType<UserEntity> | null>;
  addToFavorites(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null>;
  removeFromFavorites(userId: string, offerId: string): Promise<DocumentType<UserEntity> | null>;
  exists(documentId: string): Promise<boolean>;
}
