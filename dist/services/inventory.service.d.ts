import { Model, Types } from 'mongoose';
import {
    CreateInventoryDto,
    InventoryDto,
    SetUsedFieldDto,
    UpdateInventoryDto,
} from 'src/dto/inventory.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { InventoryDocument } from 'src/schemas/inventory.schema';
import { ErrorService } from './error.service';
export declare class InventoryService {
    private inventoryModel;
    private readonly errorService;
    constructor(inventoryModel: Model<InventoryDocument>, errorService: ErrorService);
    getAll(): Promise<InventoryDto[]>;
    add(inventory: CreateInventoryDto): Promise<SuccessDto>;
    update(inventory: UpdateInventoryDto): Promise<SuccessDto>;
    delete(id: Types.ObjectId): Promise<DeleteGetDto>;
    updateUsedAndPaid(id: Types.ObjectId, used: number, paid: number): Promise<SuccessDto>;
    updateUsed(body: SetUsedFieldDto): Promise<SuccessDto>;
}
