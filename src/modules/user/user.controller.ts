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
    this.send(
      res,
      StatusCodes.CREATED,
      fillDTO(UserResponse, result)
    );

  }
}
