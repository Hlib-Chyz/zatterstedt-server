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
import { ManufacturingCostsService } from 'src/services/manufacturing-costs.service';

@Controller('manufacturing-costs')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class ManufacturingCostsController {
    public constructor(
        private readonly manufacturingCostsService: ManufacturingCostsService,
        private readonly manufacturingCostFacade: ManufacturingCostFacade
    ) {}

    @Put('job-cost/:id')
    public async changeJobCost(
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @Body() { job }: ManufacturingCostJobDto
    ): Promise<SuccessDto> {
        return this.manufacturingCostsService.update(id, job);
    }

    @Put('inventory/:id')
    public async addInventory(
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @Body() manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<SuccessDto> {
        return this.manufacturingCostFacade.addInventory(id, manufacturingCostInventory);
    }

    @Post('can-save-inventory')
    public async canSaveInventory(
        @Body() body: CanSaveInventoryDto
    ): Promise<CanSaveInventoryResponseDto> {
        return this.manufacturingCostFacade.canSaveInventory(body);
    }
}
