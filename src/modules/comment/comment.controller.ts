import { Controller } from '../../common/controller/controller.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Request, Response } from 'express';
import CreateCommentDto from './dto/create-comment.dto.js';
import * as core from 'express-serve-static-core';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { CommentServiceInterface } from './comment-service.interface.js';
import { fillDTO } from '../../utils/common.js';
import CommentResponse from './response/comment.response.js';

type ParamsGetComments = {
  offerId: string
}

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');
    this.addRoute({path: 'offers/:offerId/comments', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: 'offers/:offerId/comments', method: HttpMethod.Post, handler: this.create});
  }

  public async create(
    {body, params}: Request<core.ParamsDictionary | ParamsGetComments, Record<string, unknown>,  CreateCommentDto>,
    res: Response
  ): Promise<void> {

    const offer = await this.offerService.findById(params.offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found`,
        'Offer Controller'
      );
    }

    const comment = await this.commentService.create(body);
    this.created(res, fillDTO(CommentResponse, comment));
  }
}
