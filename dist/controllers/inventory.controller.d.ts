import { Types } from 'mongoose';
import {
    CreateInventoryDto,
    InventoryDto,
    SetUsedFieldDto,
    UpdateInventoryDto,
} from 'src/dto/inventory.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { InventoryService } from 'src/services/inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getAll(): Promise<InventoryDto[]>;
    add(inventory: CreateInventoryDto): Promise<SuccessDto>;
    update(inventory: UpdateInventoryDto): Promise<SuccessDto>;
    updateUsed(body: SetUsedFieldDto): Promise<SuccessDto>;
    delete(id: Types.ObjectId): Promise<DeleteGetDto>;
}
