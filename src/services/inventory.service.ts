import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import {
    CreateInventoryDto,
    InventoryDto,
    SetUsedFieldDto,
    UpdateInventoryDto,
} from 'src/dto/inventory.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { Inventory, InventoryDocument } from 'src/schemas/inventory.schema';
import { ErrorService } from './error.service';

@Injectable()
export class InventoryService {
    public constructor(
        @InjectModel(Inventory.name) private inventoryModel: Model<InventoryDocument>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<InventoryDto[]> {
        try {
            const inventory = await this.inventoryModel.find().exec();
            return plainToInstance(InventoryDto, inventory.reverse(), {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all inventory');
            return [];
        }
    }

    public async add(inventory: CreateInventoryDto): Promise<SuccessDto> {
        try {
            const inventoryCost = new this.inventoryModel(inventory);
            await inventoryCost.save();
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create inventory');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async update(inventory: UpdateInventoryDto): Promise<SuccessDto> {
        try {
            const result = await this.inventoryModel
                .findByIdAndUpdate(inventory._id, inventory)
                .exec();
            if (!result) {
                throw new NotFoundException('Inventory not found');
            }
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update inventory');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async delete(id: Types.ObjectId): Promise<DeleteGetDto> {
        try {
            const result = await this.inventoryModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException('Inventory not found');
            }
            return plainToInstance(DeleteGetDto, { id }, { excludeExtraneousValues: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete inventory');
            return plainToInstance(DeleteGetDto, { id }, { excludeExtraneousValues: true });
        }
    }

    public async updateUsedAndPaid(
        id: Types.ObjectId,
        used: number,
        paid: number
    ): Promise<SuccessDto> {
        try {
            const result = await this.inventoryModel
                .findByIdAndUpdate(id, {
                    $inc: { used, paid },
                })
                .exec();
            if (!result) {
                throw new NotFoundException('Inventory not found');
            }
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to change inventory amount');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async updateUsed(body: SetUsedFieldDto): Promise<SuccessDto> {
        try {
            const result = await this.inventoryModel
                .findByIdAndUpdate(body._id, { used: body.used })
                .exec();
            if (!result) {
                throw new NotFoundException('Inventory not found');
            }
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set used field');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }
}
