"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const app_module_1 = require("./app.module");
require("tsconfig-paths/register");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:4200', 'https://zatterstedt-admin.vercel.app'],
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    const port = process.env['PORT'] || 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map