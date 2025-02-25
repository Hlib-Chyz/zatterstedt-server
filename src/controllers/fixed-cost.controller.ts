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
import { FixedCostService } from '@services/fixed-cost.service';
import { Response } from 'express';
import { Types } from 'mongoose';
import { CreateFixedCostDto, FixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
import { ParseObjectIdPipe } from 'src/dto/shared.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('fixed-cost')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class FixedCostController {
    public constructor(private readonly fixedCostService: FixedCostService) {}

    @Get()
    public async getAll(): Promise<FixedCostDto[]> {
        return this.fixedCostService.getAll();
    }

    @Post()
    public async add(
        @Body()
        fixedCost: CreateFixedCostDto,
        @Res() res: Response
    ): Promise<void> {
        await this.fixedCostService.add(fixedCost);
        res.status(204).send();
    }

    @Put()
    public async update(
        @Body() fixedCost: UpdateFixedCostDto,
        @Res() res: Response
    ): Promise<void> {
        await this.fixedCostService.update(fixedCost);
        res.status(204).send();
    }

    @Delete(':id')
    public async delete(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Res() res: Response
    ): Promise<void> {
        await this.fixedCostService.delete(id);
        res.status(204).send();
    }
}
