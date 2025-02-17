import { Injectable, NestMiddleware } from '@nestjs/common';
import { LogService } from '@services/log.service';
import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

@Injectable()
export class LogMiddleware implements NestMiddleware {
    public constructor(private readonly logService: LogService) {}

    public async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        const method = req.method.toLowerCase();
        let oldData = null;

        if (method === 'put' || method === 'delete') {
            const collection = req.baseUrl.split('/').pop();
            const documentId = req.params['id'];

            const model = req.app.get(`${collection}Model`);
            oldData = await model.findById(documentId).lean();
        }

        res.on('finish', async () => {
            if (['post', 'put', 'delete'].includes(method)) {
                const collection = req.baseUrl.split('/').pop() || '';
                const documentId = req.params['id']
                    ? new Types.ObjectId(req.params['id'])
                    : new Types.ObjectId();
                const operation =
                    method === 'post' ? 'create' : method === 'put' ? 'update' : 'delete';
                const newData = method !== 'delete' ? req.body : null;

                await this.logService.add(operation, collection, documentId, oldData, newData);
            }
        });

        next();
    }
}
