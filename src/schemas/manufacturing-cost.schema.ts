import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Inventory } from './inventory.schema';
import { Product } from './product.schema';

export type ManufacturingCostDocument = HydratedDocument<ManufacturingCost>;

@Schema()
export class Job {
    @Prop({ type: String, required: true, unique: true }) public name: string;
    @Prop({ type: Number, required: true }) public cost: number;
}

export const JobSchema = SchemaFactory.createForClass(Job);

@Schema()
export class InventoryItem {
    @Prop({ type: Types.ObjectId, required: true, unique: true, ref: Inventory.name })
    public inventoryId: Types.ObjectId;
    @Prop({ type: Number, required: true }) public quantityInCost: number;
    @Prop({ type: Number, required: true }) public quantityInUse: number;
    @Prop({ type: Boolean, required: true }) public duringManufacture: boolean;
    @Prop({ type: Number, required: true }) public cost: number;
}

export const InventorySchema = SchemaFactory.createForClass(InventoryItem);

@Schema()
export class ManufacturingCost {
    @Prop({ type: Types.ObjectId, required: true, unique: true, ref: Product.name })
    public productId: Types.ObjectId;
    @Prop({ type: [JobSchema], default: [] }) public job: Job[];
    @Prop({ type: [InventorySchema], default: [] }) public inventory: InventoryItem[];
}

export const ManufacturingCostSchema = SchemaFactory.createForClass(ManufacturingCost);
