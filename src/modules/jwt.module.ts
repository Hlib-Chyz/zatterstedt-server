import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env['JWT_SECRET']!,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    providers: [JwtStrategy],
})
export class ZatterstedtJwtModule {}
