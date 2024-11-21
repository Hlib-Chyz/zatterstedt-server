import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env['MAIL']!,
                        pass: process.env['MAIL_PASS']!,
                    },
                },
            }),
        }),
    ],
})
export class ZatterstedtMailerModule {}
