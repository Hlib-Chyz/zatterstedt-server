import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema()
export class Log {
    @Prop({ type: String, required: true }) public operation: string;
    @Prop({ type: String, required: true }) public collection: string;
    @Prop({ type: Types.ObjectId, required: true }) public documentId: Types.ObjectId;
    @Prop({ type: Object, default: null }) public oldData: Record<string, unknown> | null;
    @Prop({ type: Object, default: null }) public newData: Record<string, unknown> | null;
    @Prop({ type: Date, default: Date.now }) public createdAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
