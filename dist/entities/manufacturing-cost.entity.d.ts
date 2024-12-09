import { ObjectId } from 'mongodb';
import { JobDto, InventoryDto } from 'src/dto/manufacturing-cost.dto';
export declare class ManufacturingCost {
    _id: ObjectId;
    productId: string;
    job: JobDto[];
    inventory: InventoryDto[];
}
