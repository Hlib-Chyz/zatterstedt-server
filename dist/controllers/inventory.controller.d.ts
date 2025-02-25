import { Response } from 'express';
import { Types } from 'mongoose';
import {
    CreateInventoryDto,
    InventoryDto,
    SetUsedFieldDto,
    UpdateInventoryDto,
} from 'src/dto/inventory.dto';
import { InventoryService } from 'src/services/inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getAll(): Promise<InventoryDto[]>;
    add(inventory: CreateInventoryDto, res: Response): Promise<void>;
    update(inventory: UpdateInventoryDto, res: Response): Promise<void>;
    updateUsed(body: SetUsedFieldDto, res: Response): Promise<void>;
    delete(id: Types.ObjectId, res: Response): Promise<void>;
}
