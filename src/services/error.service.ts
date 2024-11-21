import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public throwError(error: any, additionalText: string): void {
        const response = error?.getResponse?.();
        if (response) {
            response.message = additionalText + ': ' + response.message;
        }
        throw error;
    }
}
