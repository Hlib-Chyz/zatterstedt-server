import { SuccessDto } from '@dto/shared.dto';
import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateDevelopmentCostDto } from 'src/dto/development-cost.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { DevelopmentCostsService } from 'src/services/development-costs.service';

@Controller('development-costs')
@UseFilters(new HttpExceptionFilter())
export class DevelopmentCostsController {
    public constructor(private readonly developmentCostsService: DevelopmentCostsService) {}

    @Post()
    public async addDevelopmentCost(
        @Body()
        developmentCost: CreateDevelopmentCostDto
    ): Promise<SuccessDto> {
        return this.developmentCostsService.add(developmentCost);
    }
}
