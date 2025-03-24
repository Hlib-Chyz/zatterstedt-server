import { Body, Controller, Param, Post, Put, Res, UseFilters, UseGuards } from '@nestjs/common';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { Response } from 'express';
import { Types } from 'mongoose';
import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    ManufacturingCostInventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { ParseObjectIdPipe } from 'src/dto/shared.dto';
import { ManufacturingCostFacade } from 'src/facades/manufacturing-cost.facade';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

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
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Body() { job }: ManufacturingCostJobDto,
        @Res() res: Response
    ): Promise<void> {
        await this.manufacturingCostService.updateJob(id, job);
        res.status(204).send();
    }

    @Put('inventory/:id')
    public async updateInventory(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Body() manufacturingCostInventory: ManufacturingCostInventoryDto,
        @Res() res: Response
    ): Promise<void> {
        await this.manufacturingCostFacade.updateInventory(id, manufacturingCostInventory);
        res.status(204).send();
    }

    @Post('can-save-inventory')
    public async canSaveInventory(
        @Body() body: CanSaveInventoryDto
    ): Promise<CanSaveInventoryResponseDto> {
        return this.manufacturingCostFacade.canSaveInventory(body);
    }
}
