import { SuccessDto } from '@dto/shared.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { AdditionalCostService } from '@services/additional-cost.service';

@Controller('additional-cost')
@UseGuards(JwtAuthGuard)
export class AdditionalCostController {
    public constructor(private additionalCostService: AdditionalCostService) {}

    @Put()
    public async update(@Body() additionalCost: UpdateAdditionalCostDto): Promise<SuccessDto> {
        return this.additionalCostService.update(additionalCost);
    }
}
