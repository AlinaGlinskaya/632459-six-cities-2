import { Request, Response, NextFunction } from 'express';
import { MiddlewareInterface } from '../../types/middleware.interface.js';
import multer, { diskStorage } from 'multer';
import mime from 'mime-types';
import { nanoid } from 'nanoid';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private fieldName: string,
    private directory: string
  ) {}

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.directory,
      filename: (_req, file, cb) => {
        const extension = mime.extension(file.mimetype);
        const filename = nanoid();
        cb(null, `${filename}.${extension}`);
      }
    });

    const uploadSingleFileMiddleware = multer({
      storage: storage,
      fileFilter: (_req, file, cb) => {
        const extension = mime.extension(file.mimetype);
        cb(null, extension === 'png' || extension === 'jpg' || extension === 'jpeg');
      }
    }).single(this.fieldName);
    uploadSingleFileMiddleware(req, res, next);
  }
}
