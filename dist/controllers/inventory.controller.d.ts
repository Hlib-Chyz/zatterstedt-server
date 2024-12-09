import { ObjectId } from 'mongodb';
import { CreateInventoryDto, InventoryDto, UpdateInventoryDto } from 'src/dto/inventory.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { InventoryService } from 'src/services/inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getAll(): Promise<InventoryDto[]>;
    create(inventory: CreateInventoryDto): Promise<SuccessDto>;
    update(inventory: UpdateInventoryDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
}
