import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import multer, { diskStorage } from 'multer';
import mime from 'mime-types';
import { MiddlewareInterface } from './middleware.interface';
import { UPLOAD_IMAGE_EXTENSIONS } from '../../types/constants.js';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) { }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${extension}`);
      }
    });

    const uploadSingleFileMiddleware = multer({
      storage,
      fileFilter: function (_req, file, callback) {
        const extension = mime.extension(file.mimetype);
        if (extension && UPLOAD_IMAGE_EXTENSIONS.indexOf(extension) === -1) {
          return callback(new HttpError(
            StatusCodes.BAD_REQUEST,
            `${extension} extension is not in the allowed list for the image.`,
            'UploadFileMiddleware'
          ));
        }
        callback(null, true);
      }
    })
      .single(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
