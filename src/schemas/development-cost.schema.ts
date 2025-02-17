import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from './product.schema';

export type DevelopmentCostDocument = HydratedDocument<DevelopmentCost>;

@Schema()
export class DevelopmentCost {
    @Prop({ type: Date, required: true }) public date: Date;
    @Prop({ type: String, required: true }) public description: string;
    @Prop({ type: Number, required: true }) public cost: number;
    @Prop({ type: Types.ObjectId, ref: Product.name, required: true })
    public productId: Types.ObjectId;
}

export const DevelopmentCostSchema = SchemaFactory.createForClass(DevelopmentCost);
DevelopmentCostSchema.index({ date: 1, description: 1, cost: 1 }, { unique: true });
