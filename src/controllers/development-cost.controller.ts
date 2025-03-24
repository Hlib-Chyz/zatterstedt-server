import { ParseObjectIdPipe } from '@dto/shared.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Put,
    Res,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { DevelopmentCostService } from '@services/development-cost.service';
import { Response } from 'express';
import { Types } from 'mongoose';
import { CreateDevelopmentCostDto, UpdateDevelopmentCostDto } from 'src/dto/development-cost.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';

@Controller('development-cost')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class DevelopmentCostController {
    public constructor(private readonly developmentCostService: DevelopmentCostService) {}

    @Post()
    public async add(
        @Body()
        developmentCost: CreateDevelopmentCostDto,
        @Res() res: Response
    ): Promise<void> {
        await this.developmentCostService.add(developmentCost);
        res.status(204).send();
    }

    @Put()
    public async update(
        @Body()
        developmentCost: UpdateDevelopmentCostDto,
        @Res() res: Response
    ): Promise<void> {
        await this.developmentCostService.update(developmentCost);
        res.status(204).send();
    }

    @Delete(':id')
    public async delete(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Res() res: Response
    ): Promise<void> {
        await this.developmentCostService.delete(id);
        res.status(204).send();
    }
}
