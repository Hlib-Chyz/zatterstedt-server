import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { Inventory } from '@schemas/inventory.schema';
import { ObjectId } from 'mongodb';
import { CreateInventoryDto, SetUsedFieldDto, UpdateInventoryDto } from 'src/dto/inventory.dto';
import { DeleteGetDto, ParseObjectIdPipe, SuccessDto } from 'src/dto/shared.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { InventoryService } from 'src/services/inventory.service';

@Controller('inventory')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class InventoryController {
    public constructor(private readonly inventoryService: InventoryService) {}

    @Get()
    public async getAll(): Promise<Inventory[]> {
        return this.inventoryService.getAll();
    }

    @Post()
    public async add(
        @Body()
        inventory: CreateInventoryDto
    ): Promise<SuccessDto> {
        return this.inventoryService.add(inventory);
    }

    @Put()
    public async update(@Body() inventory: UpdateInventoryDto): Promise<SuccessDto> {
        return this.inventoryService.update(inventory);
    }

    @Put('used')
    public async updateUsed(@Body() body: SetUsedFieldDto): Promise<SuccessDto> {
        return this.inventoryService.updateUsed(body);
    }

    @Delete(':id')
    public async delete(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<DeleteGetDto> {
        return this.inventoryService.delete(id);
    }
}
