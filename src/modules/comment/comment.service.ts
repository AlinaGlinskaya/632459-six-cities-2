import { DocumentType, types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import createCommentDto from './dto/create-comment.dto.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import chalk from 'chalk';
import { COMMENTS_LIMIT, SortType } from '../../const.js';


@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>) {}

  public async create(dto: createCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(chalk.green('Comment created.'));
    return comment.populate('authorId');
  }

  public async findByOfferId(id: string): Promise<types.DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({id})
      .sort({createdAt: SortType.Down})
      .limit(COMMENTS_LIMIT)
      .populate('authorId')
      .exec();
  }
}
