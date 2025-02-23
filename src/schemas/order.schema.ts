import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Variant } from '@schemas/variant.schema';
import { HydratedDocument, Types } from 'mongoose';
import { Client } from './client.schema';

type VariantItemDocument = HydratedDocument<VariantItem>;

@Schema()
class VariantItem {
    @Prop({ type: Types.ObjectId, required: true, unique: true, ref: Variant.name })
    public variantId: Types.ObjectId;
    @Prop({ type: Number, required: true }) public quantity: number;
    @Prop({ type: Number, required: true }) public price: number;
}

const VariantItemSchema = SchemaFactory.createForClass(VariantItem);

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
    @Prop({ type: Date, required: true }) public date: Date;
    @Prop({ type: String, required: true, unique: true }) public orderNumber: string;
    @Prop({ type: Types.ObjectId, required: true, ref: Client.name })
    public clientId: Types.ObjectId;
    @Prop({ type: [VariantItemSchema], required: true }) public variants: VariantItemDocument[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
