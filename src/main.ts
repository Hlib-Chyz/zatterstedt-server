import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import 'tsconfig-paths/register';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: [
            'http://localhost:4200',
            'https://zatterstedt-admin.vercel.app',
            'https://demo-zatterstedt-admin.vercel.app',
        ],
        allowedHeaders: ['x-vercel-protection-bypass', 'Authorization'],
    });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        })
    );
    const port = process.env['PORT'] || 3000;
    await app.listen(port);
}
bootstrap();
