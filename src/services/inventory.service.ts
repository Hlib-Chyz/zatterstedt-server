import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateInventoryDto, SetUsedFieldDto, UpdateInventoryDto } from 'src/dto/inventory.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { Inventory } from 'src/schemas/inventory.schema';
import { ErrorService } from './error.service';

@Injectable()
export class InventoryService {
    public constructor(
        @InjectModel(Inventory.name) private inventoryModel: Model<Inventory>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<Inventory[]> {
        try {
            const inventory = await this.inventoryModel.find().exec();
            return inventory.reverse();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all inventory');
            return [];
        }
    }

    public async add(inventory: CreateInventoryDto): Promise<SuccessDto> {
        try {
            const inventoryCost = new this.inventoryModel(inventory);
            await inventoryCost.save();
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create inventory');
            return new SuccessDto({ success: false });
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
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update inventory');
            return new SuccessDto({ success: false });
        }
    }

    public async delete(id: ObjectId): Promise<DeleteGetDto> {
        try {
            const result = await this.inventoryModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException('Inventory not found');
            }
            return new DeleteGetDto({ id });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete inventory');
            return new DeleteGetDto({ id });
        }
    }

    public async updateUsedAndPaid(id: ObjectId, used: number, paid: number): Promise<SuccessDto> {
        try {
            const result = await this.inventoryModel
                .findByIdAndUpdate(id, {
                    $inc: { used, paid },
                })
                .exec();
            if (!result) {
                throw new NotFoundException('Inventory not found');
            }
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to change inventory amount');
            return new SuccessDto({ success: false });
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
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set used field');
            return new SuccessDto({ success: false });
        }
    }
}
