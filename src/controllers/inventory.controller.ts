import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Res,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { Types } from 'mongoose';
import {
    CreateInventoryDto,
    InventoryDto,
    SetUsedFieldDto,
    UpdateInventoryDto,
} from 'src/dto/inventory.dto';
import { ParseObjectIdPipe } from 'src/dto/shared.dto';
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
    public async add(
        @Body()
        inventory: CreateInventoryDto,
        @Res() res: Response
    ): Promise<void> {
        await this.inventoryService.add(inventory);
        res.status(204).send();
    }

    @Put()
    public async update(
        @Body() inventory: UpdateInventoryDto,
        @Res() res: Response
    ): Promise<void> {
        await this.inventoryService.update(inventory);
        res.status(204).send();
    }

    @Put('used')
    public async updateUsed(@Body() body: SetUsedFieldDto, @Res() res: Response): Promise<void> {
        await this.inventoryService.updateUsed(body);
        res.status(204).send();
    }

    @Delete(':id')
    public async delete(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Res() res: Response
    ): Promise<void> {
        await this.inventoryService.delete(id);
        res.status(204).send();
    }
}
