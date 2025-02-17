import { Body, Controller, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    ManufacturingCostInventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { ParseObjectIdPipe, SuccessDto } from 'src/dto/shared.dto';
import { ManufacturingCostFacade } from 'src/facades/manufacturing-cost.facade';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';

@Controller('manufacturing-cost')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class ManufacturingCostController {
    public constructor(
        private readonly manufacturingCostService: ManufacturingCostService,
        private readonly manufacturingCostFacade: ManufacturingCostFacade
    ) {}

    @Put('job/:id')
    public async updateJob(
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @Body() { job }: ManufacturingCostJobDto
    ): Promise<SuccessDto> {
        return this.manufacturingCostService.updateJob(id, job);
    }

    @Put('inventory/:id')
    public async updateInventory(
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @Body() manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<SuccessDto> {
        return this.manufacturingCostFacade.updateInventory(id, manufacturingCostInventory);
    }

    @Post('can-save-inventory')
    public async canSaveInventory(
        @Body() body: CanSaveInventoryDto
    ): Promise<CanSaveInventoryResponseDto> {
        return this.manufacturingCostFacade.canSaveInventory(body);
    }
}
