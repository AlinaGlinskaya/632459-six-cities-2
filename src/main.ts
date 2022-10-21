import Application from './app/application.js';
import ConfigService from './common/config/config.service.js';
import LoggerService from './common/logger/logger.service.js';
import { Container } from 'inversify';
import { Component } from './types/component.types.js';
import { LoggerInterface } from './common/logger/logger.interface.js';
import { ConfigInterface } from './common/config/config.interface.js';
import { DatabaseInterface } from './common/database-client/database.interface.js';
import 'reflect-metadata';
import DatabaseService from './common/database-client/database.service.js';
import { UserServiceInterface } from './modules/user/user-service.interface.js';
import UserService from './modules/user/user.service.js';
import { types } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './modules/user/user.entity.js';
import { OfferEntity, OfferModel } from './modules/offer/offer.entity.js';
import { OfferServiceInterface } from './modules/offer/offer-service.interface.js';
import OfferService from './modules/offer/offer.service.js';
import { CommentEntity, CommentModel } from './modules/comment/comment.entity.js';
import { CommentServiceInterface } from './modules/comment/comment-service.interface.js';
import CommentService from './modules/comment/comment.service.js';
import UserController from './modules/user/user.controller.js';
import { ControllerInterface } from './common/controller/controller.interface.js';
import OfferController from './modules/offer/offer.controller.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
applicationContainer.bind<OfferServiceInterface>(Component.OfferServiceInterface).to(OfferService);
applicationContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
applicationContainer.bind<CommentServiceInterface>(Component.CommentServiceInterface).to(CommentService);
applicationContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.OfferController).to(OfferController).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);
await application.init();
