import { NestMiddleware } from '@nestjs/common';
import { LogService } from '@services/log.service';
import { NextFunction, Request, Response } from 'express';
export declare class LogMiddleware implements NestMiddleware {
    private readonly logService;
    constructor(logService: LogService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
