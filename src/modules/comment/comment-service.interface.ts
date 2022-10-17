import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity';
import CreateCommentDto from './dto/create-comment.dto.js';

export interface CommentServiceInterface {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(id: string): Promise<DocumentType<CommentEntity>[]>;
}
