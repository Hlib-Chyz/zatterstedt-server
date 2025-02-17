import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Variant } from './variant.schema';

export type StockDocument = HydratedDocument<Stock>;

@Schema()
export class Stock {
    @Prop({ type: Types.ObjectId, required: true, unique: true, ref: Variant.name })
    public variantId: Types.ObjectId;
    @Prop({ type: Number, default: 0 }) public sold: number;
    @Prop({ type: Number, required: true }) public total: number;
    @Prop({ type: Number, required: true }) public realizedParty: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
