import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ConfigInterface } from '../../common/config/config.interface.js';
import { Controller } from '../../common/controller/controller.js';
import HttpError from '../../common/errors/http-error.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO, createJWT } from '../../utils/common.js';
import CreateUserDto from './dto/create-user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import UserResponse from './response/user.response.js';
import LoginUserDto from './dto/login-user.dto.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';
import { JWT_ALGORITHM } from '../../const.js';
import LoggedUserResponse from './response/logged-user.response.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface
  ) {
    super(logger);

    this.logger.info('Register routes for UserController...');
    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({path: '/login', method: HttpMethod.Get, handler: this.checkAuth});
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new DocumentExistsMiddleware(this.userService, 'user', 'userId'),
        new UploadFileMiddleware('avatar', this.configService.get('UPLOAD_DIRECTORY'))
      ]
    });
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

    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorised',
        'UserController'
      );
    }

    const token = await createJWT(
      JWT_ALGORITHM,
      this.configService.get('JWT_SECRET'),
      {email: user.email, id: user.id});
    this.ok(res, fillDTO(LoggedUserResponse, {email: user.email, token}));
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

    this.ok(res, fillDTO(LoggedUserResponse, existUser));
  }

  public async uploadAvatar(req: Request, res: Response) {
    const avatar = req.file?.path || '';
    await this.userService.updateById(req.params.userId, avatar);
    this.ok(res, {
      filepath: req.file?.path
    });
  }
}
