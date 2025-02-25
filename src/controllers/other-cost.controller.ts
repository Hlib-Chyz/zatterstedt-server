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
import { OtherCostService } from '@services/other-cost.service';
import { Response } from 'express';
import { Types } from 'mongoose';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { ParseObjectIdPipe } from 'src/dto/shared.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('other-cost')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class OtherCostController {
    public constructor(private readonly otherCostService: OtherCostService) {}

    @Get()
    public async getAll(): Promise<OtherCostDto[]> {
        return this.otherCostService.getAll();
    }

    @Post()
    public async add(
        @Body()
        otherCost: CreateOtherCostDto,
        @Res() res: Response
    ): Promise<void> {
        await this.otherCostService.add(otherCost);
        res.status(204).send();
    }

    @Put()
    public async update(
        @Body() otherCost: UpdateOtherCostDto,
        @Res() res: Response
    ): Promise<void> {
        await this.otherCostService.update(otherCost);
        res.status(204).send();
    }

    @Delete(':id')
    public async delete(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Res() res: Response
    ): Promise<void> {
        await this.otherCostService.delete(id);
        res.status(204).send();
    }
}
