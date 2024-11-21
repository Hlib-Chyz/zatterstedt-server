import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Inventory } from 'src/entities/inventory.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { CreateInventoryDto, InventoryDto, UpdateInventoryDto } from 'src/dto/inventory.dto';

@Injectable()
export class InventoryService {
    public constructor(
        @InjectRepository(Inventory) private inventoryRepository: Repository<Inventory>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<InventoryDto[]> {
        try {
            return await this.inventoryRepository.find();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all inventory');
            return [];
        }
    }

    public async create(inventory: CreateInventoryDto): Promise<SuccessDto> {
        try {
            await this.inventoryRepository.save(inventory);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create inventory');
            return { success: false };
        }
    }

    public async update(inventory: UpdateInventoryDto): Promise<SuccessDto> {
        try {
            const foundInventory = await this.inventoryRepository.findOne({
                where: { _id: inventory._id },
            });
            if (!foundInventory) {
                throw new NotFoundException('Inventory not found');
            }
            await this.inventoryRepository.save(inventory);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update inventory');
            return { success: false };
        }
    }

    public async delete(_id: ObjectId): Promise<DeleteGetDto> {
        try {
            await this.inventoryRepository.delete({ _id });
            return { _id };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete inventory');
            return { _id };
        }
    }

    public async changeInventoryAmount(_id: string, used: number): Promise<SuccessDto> {
        try {
            const foundInventory = await this.inventoryRepository.findOne({
                where: { _id: new ObjectId(_id) },
            });
            if (!foundInventory) {
                throw new NotFoundException('Inventory not found');
            }
            await this.inventoryRepository.save({ _id, used: foundInventory.used + used });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete inventory');
            return { success: false };
        }
    }
}
