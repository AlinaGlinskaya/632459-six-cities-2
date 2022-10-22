import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { ExceptionFilterInterface } from './exception-filter.interface.js';
import HttpError from './http-error.js';
import { createErrorObject } from '../../utils/common.js';

@injectable()
export default class ExceptionFilter implements ExceptionFilterInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface
  ) {
    this.logger.info('Register exception filter...');
  }

  public handleHttpError(error: HttpError, _req: Request, res: Response) {
    this.logger.error(`${error.detail}: ${error.httpStatusCode} — ${error.message}`);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  public handleOtherError(error: Error, _req: Request, res: Response) {
    this.logger.error(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }

  public catch(error: Error | HttpError, _req: Request, res: Response): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, _req, res);
    }
    return this.handleOtherError(error, _req, res);
  }
}
