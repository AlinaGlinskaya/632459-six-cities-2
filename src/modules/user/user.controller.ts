//import { Request, Response } from 'express';
import {inject, injectable} from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
//import { HttpMethod } from '../../types/http-method.enum.js';

@injectable()
export default class UserController extends Controller {
  constructor(@inject(Component.LoggerInterface) logger: LoggerInterface) {
    super(logger);

    this.logger.info('Register routes for UserController...');
  }
}
