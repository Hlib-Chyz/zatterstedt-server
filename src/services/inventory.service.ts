import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { ClientSession, Model, Types } from 'mongoose';
import {
    CreateInventoryDto,
    InventoryDto,
    SetUsedFieldDto,
    UpdateInventoryDto,
} from 'src/dto/inventory.dto';
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

    public async add(inventory: CreateInventoryDto): Promise<void> {
        try {
            const inventoryCost = new this.inventoryModel(inventory);
            await inventoryCost.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create inventory');
        }
    }

    public async update(inventory: UpdateInventoryDto): Promise<void> {
        try {
            const result = await this.inventoryModel
                .findOneAndUpdate({ _id: inventory._id }, inventory)
                .exec();
            if (!result) {
                throw new NotFoundException('Inventory not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update inventory');
        }
    }

    public async delete(id: Types.ObjectId): Promise<void> {
        try {
            const result = await this.inventoryModel.findOneAndDelete({ _id: id }).exec();
            if (!result) {
                throw new NotFoundException('Inventory not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete inventory');
        }
    }

    public async updateUsedAndPaid(
        id: Types.ObjectId,
        used: number,
        paid: number,
        session: ClientSession
    ): Promise<void> {
        try {
            const result = await this.inventoryModel
                .findOneAndUpdate(
                    { _id: id },
                    {
                        $inc: { used, paid },
                    }
                )
                .session(session)
                .exec();
            if (!result) {
                throw new NotFoundException('Inventory not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to change inventory amount');
        }
    }

    public async updateUsed(body: SetUsedFieldDto): Promise<void> {
        try {
            const result = await this.inventoryModel
                .findOneAndUpdate({ _id: body._id }, { used: body.used })
                .exec();
            if (!result) {
                throw new NotFoundException('Inventory not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set used field');
        }
    }
}
