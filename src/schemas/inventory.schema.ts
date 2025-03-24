import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { log } from 'src/helpers/log.helper';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema()
export class Inventory {
    @Prop({ type: String, required: true, unique: true }) public name: string;
    @Prop({ type: Number, required: true }) public totalCost: number;
    @Prop({ type: Number, required: true }) public amount: number;
    @Prop({ type: Number, default: 0 }) public used: number;
    @Prop({ type: Number, default: 0 }) public paid: number;
    @Prop({ type: Date, required: true }) public date: Date;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

log(InventorySchema, Inventory.name);
