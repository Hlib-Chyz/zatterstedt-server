import { ClientSession, Model, Types } from 'mongoose';
import {
    CreateInventoryDto,
    InventoryDto,
    SetUsedFieldDto,
    UpdateInventoryDto,
} from 'src/dto/inventory.dto';
import { InventoryDocument } from 'src/schemas/inventory.schema';
import { ErrorService } from './error.service';
export declare class InventoryService {
    private inventoryModel;
    private readonly errorService;
    constructor(inventoryModel: Model<InventoryDocument>, errorService: ErrorService);
    getAll(): Promise<InventoryDto[]>;
    add(inventory: CreateInventoryDto): Promise<void>;
    update(inventory: UpdateInventoryDto): Promise<void>;
    delete(id: Types.ObjectId): Promise<void>;
    updateUsedAndPaid(
        id: Types.ObjectId,
        used: number,
        paid: number,
        session: ClientSession
    ): Promise<void>;
    updateUsed(body: SetUsedFieldDto): Promise<void>;
}
