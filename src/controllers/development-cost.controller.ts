import { DeleteGetDto, ParseObjectIdPipe, SuccessDto } from '@dto/shared.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Delete, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { DevelopmentCostService } from '@services/development-cost.service';
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
        developmentCost: CreateDevelopmentCostDto
    ): Promise<SuccessDto> {
        return this.developmentCostService.add(developmentCost);
    }

    @Put()
    public async update(
        @Body()
        developmentCost: UpdateDevelopmentCostDto
    ): Promise<SuccessDto> {
        return this.developmentCostService.update(developmentCost);
    }

    @Delete(':id')
    public async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId): Promise<DeleteGetDto> {
        return this.developmentCostService.delete(id);
    }
}
