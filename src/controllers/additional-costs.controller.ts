import { SuccessDto } from '@dto/shared.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { AdditionalCostsService } from 'src/services/additional-costs.service';

@Controller('additional-costs')
@UseGuards(JwtAuthGuard)
export class AdditionalCostsController {
    public constructor(private additionalCostsService: AdditionalCostsService) {}

    @Put()
    public async change(@Body() additionalCost: UpdateAdditionalCostDto): Promise<SuccessDto> {
        return this.additionalCostsService.update(additionalCost);
    }
}
