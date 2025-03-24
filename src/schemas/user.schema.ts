import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ type: String, required: true, unique: true }) public email: string;
    @Prop({ type: String, required: true }) public password: string;
    @Prop({ type: String, default: null }) public emailVerificationCode: string | null;
}

export const UserSchema = SchemaFactory.createForClass(User);
