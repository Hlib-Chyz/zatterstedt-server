import { OnModuleInit } from '@nestjs/common';
import { LogService } from '@services/log.service';
export declare class LoggingHooks implements OnModuleInit {
    private readonly logService;
    private readonly logger;
    constructor(logService: LogService);
    onModuleInit(): void;
}
