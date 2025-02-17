import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OtherCostDocument = HydratedDocument<OtherCost>;

@Schema()
export class OtherCost {
    @Prop({ type: Date, required: true }) public date: Date;
    @Prop({ type: String, required: true }) public name: string;
    @Prop({ type: Number, required: true }) public cost: number;
}

export const OtherCostSchema = SchemaFactory.createForClass(OtherCost);
