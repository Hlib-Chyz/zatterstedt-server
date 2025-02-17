import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FixedCostDocument = HydratedDocument<FixedCost>;

@Schema()
export class FixedCost {
    @Prop({ type: String, required: true, unique: true }) public name: string;
    @Prop({ type: Number, required: true }) public cost: number;
}

export const FixedCostSchema = SchemaFactory.createForClass(FixedCost);
