import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/schemas/product.schema';

export type AdditionalCostDocument = HydratedDocument<AdditionalCost>;

@Schema({ collection: 'additional_costs' })
export class AdditionalCost {
    @Prop({ type: Types.ObjectId, ref: Product.name, required: true, unique: true })
    public productId: Types.ObjectId;
    @Prop({ type: Number, default: 0 }) public cost: number;
}

export const AdditionalCostSchema = SchemaFactory.createForClass(AdditionalCost);
