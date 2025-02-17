import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateInventoryDto, SetUsedFieldDto, UpdateInventoryDto } from 'src/dto/inventory.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { Inventory } from 'src/schemas/inventory.schema';
import { ErrorService } from './error.service';
export declare class InventoryService {
    private inventoryModel;
    private readonly errorService;
    constructor(inventoryModel: Model<Inventory>, errorService: ErrorService);
    getAll(): Promise<Inventory[]>;
    add(inventory: CreateInventoryDto): Promise<SuccessDto>;
    update(inventory: UpdateInventoryDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
    updateUsedAndPaid(id: ObjectId, used: number, paid: number): Promise<SuccessDto>;
    updateUsed(body: SetUsedFieldDto): Promise<SuccessDto>;
}
