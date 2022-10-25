import { Controller } from '../../common/controller/controller.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { Request, Response } from 'express';
import CreateCommentDto from './dto/create-comment.dto.js';
import * as core from 'express-serve-static-core';
import { CommentServiceInterface } from './comment-service.interface.js';
import { fillDTO } from '../../utils/common.js';
import CommentResponse from './response/comment.response.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';

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
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId')
      ]
    });
  }

  public async create(
    {body, params}: Request<core.ParamsDictionary | ParamsGetComments, Record<string, unknown>,  CreateCommentDto>,
    res: Response
  ): Promise<void> {

    await this.offerService.findById(params.offerId);
    const comment = await this.commentService.create(body);
    await this.offerService.incCommentCount(params.offerId);
    await this.offerService.calculateRating(params.offerId, Number(body.rating));
    this.created(res, fillDTO(CommentResponse, comment));
  }

  public async index(
    {params}: Request<core.ParamsDictionary | ParamsGetComments>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    await this.offerService.findById(offerId);
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, fillDTO(CommentResponse, comments));
  }
}
