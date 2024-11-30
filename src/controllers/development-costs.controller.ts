import { DeleteGetDto, ParseObjectIdPipe, SuccessDto } from '@dto/shared.dto';
import { Body, Controller, Delete, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CreateDevelopmentCostDto, UpdateDevelopmentCostDto } from 'src/dto/development-cost.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { DevelopmentCostsService } from 'src/services/development-costs.service';

@Controller('development-costs')
@UseFilters(new HttpExceptionFilter())
export class DevelopmentCostsController {
    public constructor(private readonly developmentCostsService: DevelopmentCostsService) {}

    @Post()
    public async add(
        @Body()
        developmentCost: CreateDevelopmentCostDto
    ): Promise<SuccessDto> {
        return this.developmentCostsService.add(developmentCost);
    }

    @Put()
    public async update(
        @Body()
        developmentCost: UpdateDevelopmentCostDto
    ): Promise<SuccessDto> {
        return this.developmentCostsService.update(developmentCost);
    }

    @Delete(':id')
    public async delete(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<DeleteGetDto> {
        return this.developmentCostsService.delete(id);
    }
}
