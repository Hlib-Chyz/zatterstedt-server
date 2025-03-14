import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { log } from 'src/helpers/log.helper';
import { Inventory } from './inventory.schema';
import { Product } from './product.schema';

@Schema()
class Job {
    @Prop({ type: String, required: true, unique: true }) public name: string;
    @Prop({ type: Number, required: true }) public cost: number;
}

const JobSchema = SchemaFactory.createForClass(Job);

@Schema()
class InventoryItem {
    @Prop({ type: Types.ObjectId, required: true, unique: true, ref: Inventory.name })
    public inventoryId: Types.ObjectId;
    @Prop({ type: Number, required: true }) public quantityInCost: number;
    @Prop({ type: Number, required: true }) public quantityInUse: number;
    @Prop({ type: Boolean, required: true }) public duringManufacture: boolean;
    @Prop({ type: Number, required: true }) public cost: number;
}

const InventorySchema = SchemaFactory.createForClass(InventoryItem);

export type ManufacturingCostDocument = HydratedDocument<ManufacturingCost>;

@Schema({ collection: 'manufacturing_costs' })
export class ManufacturingCost {
    @Prop({ type: Types.ObjectId, required: true, unique: true, ref: Product.name })
    public productId: Types.ObjectId;
    @Prop({ type: [JobSchema], default: [] }) public job: Job[];
    @Prop({ type: [InventorySchema], default: [] }) public inventory: InventoryItem[];
}

export const ManufacturingCostSchema = SchemaFactory.createForClass(ManufacturingCost);

log(ManufacturingCostSchema, ManufacturingCost.name);
