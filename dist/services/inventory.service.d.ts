import { ObjectId } from 'mongodb';
import { Inventory } from 'src/entities/inventory.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { CreateInventoryDto, InventoryDto, UpdateInventoryDto } from 'src/dto/inventory.dto';
export declare class InventoryService {
    private inventoryRepository;
    private readonly errorService;
    constructor(inventoryRepository: Repository<Inventory>, errorService: ErrorService);
    getAll(): Promise<InventoryDto[]>;
    create(inventory: CreateInventoryDto): Promise<SuccessDto>;
    update(inventory: UpdateInventoryDto): Promise<SuccessDto>;
    delete(_id: ObjectId): Promise<DeleteGetDto>;
    changeInventoryAmount(_id: string, used: number, paid: number): Promise<SuccessDto>;
}
