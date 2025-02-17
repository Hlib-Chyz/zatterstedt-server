import { Inventory } from '@schemas/inventory.schema';
import { ObjectId } from 'mongodb';
import { CreateInventoryDto, SetUsedFieldDto, UpdateInventoryDto } from 'src/dto/inventory.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { InventoryService } from 'src/services/inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getAll(): Promise<Inventory[]>;
    add(inventory: CreateInventoryDto): Promise<SuccessDto>;
    update(inventory: UpdateInventoryDto): Promise<SuccessDto>;
    updateUsed(body: SetUsedFieldDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
}
