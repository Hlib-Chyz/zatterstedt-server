import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            message:
                (exception.getResponse() as { message: string | string[] | undefined })?.message ??
                'Something went wrong',
            timestamp: new Date().toISOString(),
        });
    }
}
