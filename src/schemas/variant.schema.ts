import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from './product.schema';

export type VariantDocument = HydratedDocument<Variant>;

@Schema()
export class Variant {
    @Prop({ type: String, required: true }) public color: string;
    @Prop({ type: String, required: true }) public size: string;
    @Prop({ type: Types.ObjectId, required: true, ref: Product.name })
    public productId: Types.ObjectId;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
VariantSchema.index({ color: 1, size: 1, productId: 1 }, { unique: true });
