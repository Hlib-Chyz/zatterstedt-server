import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
    @Prop({ type: String, required: true }) public name: string;
    @Prop({ type: String, required: true }) public contact: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
ClientSchema.index({ name: 1, contact: 1 }, { unique: true });
