import { DocumentType, types } from '@typegoose/typegoose';
import CreateUserDto from './dto/create-user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import { UserEntity } from './user.entity.js';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import chalk from 'chalk';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.UserModel) private userModel: types.ModelType<UserEntity>) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    if (user.avatarPath === null || user.avatarPath === undefined) {
      user.avatarPath = './uploads/avatar.svg';
    }
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(chalk.green(`New user ${dto.email} created`));
    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findById(userId: string): Promise<DocumentType<UserEntity, types.BeAnObject> | null> {
    return this.userModel.findById({userId});
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);
    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, filepath: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, {'$set': {avatarPath: filepath}}, {new: true});
  }

  public async findFavoritesIds(userId: string): Promise<types.DocumentType<UserEntity> | null> {
    return this.userModel.findById(userId, {favorites: 1, _id: 0});
  }

  public async addToFavorites(userId: string, offerId: string): Promise<types.DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, {'$push': {favorites: offerId}}, {new: true});
  }

  public async removeFromFavorites(userId: string, offerId: string): Promise<types.DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, {'$pull': {favorites: offerId}});
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.userModel.exists({_id: documentId})) !== null;
  }
}
