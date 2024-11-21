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
import { ObjectId } from 'mongodb';
import { CreateInventoryDto, InventoryDto, UpdateInventoryDto } from 'src/dto/inventory.dto';
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
    public async getAll(): Promise<InventoryDto[]> {
        return this.inventoryService.getAll();
    }

    @Post()
    public async create(
        @Body()
        inventory: CreateInventoryDto
    ): Promise<SuccessDto> {
        return this.inventoryService.create(inventory);
    }

    @Put()
    public async update(@Body() inventory: UpdateInventoryDto): Promise<SuccessDto> {
        return this.inventoryService.update(inventory);
    }

    @Delete(':id')
    public async delete(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<DeleteGetDto> {
        return this.inventoryService.delete(id);
    }
}
