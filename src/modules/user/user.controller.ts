import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {inject, injectable} from 'inversify';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../utils/common.js';
import CreateUserDto from './dto/create-user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import UserResponse from './response/user.response.js';
import LoginUserDto from './dto/login-user.dto.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');
    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
    this.addRoute({path: '/login', method: HttpMethod.Get, handler: this.checkAuth});
    this.addRoute({path: '/logout', method: HttpMethod.Post, handler: this.logout});
  }

  public async create(
    {body}:Request<Record<string, unknown>, Record<string,unknown>, CreateUserDto>,
    res: Response): Promise<void> {

    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ${body.email} already exists.`,
        'User Controller'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(
      res, fillDTO(UserResponse, result)
    );

  }

  public async login(
    {body}:Request<Record<string, unknown>, Record<string,unknown>, LoginUserDto>,
    res: Response): Promise<void> {

    const existUser = await this.userService.findByEmail(body.email);

    if(!existUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found`,
        'UserController'
      );
    }

    const token = 'someToken';
    this.ok(res, token);
  }

  public async checkAuth(
    {body}:Request<Record<string, unknown>, Record<string,unknown>>,
    res: Response): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (!existUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} unauthorised`,
        'UserController'
      );
    }

    this.ok(res, fillDTO(UserResponse, existUser));
  }

  public async logout(
    {body}:Request<Record<string, unknown>, Record<string,unknown>>,
    res: Response): Promise<void> {

    const existUser = await this.userService.findByEmail(body.email);

    if (!existUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} unauthorised`,
        'UserController'
      );
    }

    this.noContent(res);
  }
}
