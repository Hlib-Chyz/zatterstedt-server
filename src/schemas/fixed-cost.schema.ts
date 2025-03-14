import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { log } from 'src/helpers/log.helper';

export type FixedCostDocument = HydratedDocument<FixedCost>;

@Schema({ collection: 'fixed_costs' })
export class FixedCost {
    @Prop({ type: String, required: true, unique: true }) public name: string;
    @Prop({ type: Number, required: true }) public cost: number;
}

export const FixedCostSchema = SchemaFactory.createForClass(FixedCost);

log(FixedCostSchema, FixedCost.name);
