import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Put, Res, UseGuards } from '@nestjs/common';
import { AdditionalCostService } from '@services/additional-cost.service';
import { Response } from 'express';
import { UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';

@Controller('additional-cost')
@UseGuards(JwtAuthGuard)
export class AdditionalCostController {
    public constructor(private additionalCostService: AdditionalCostService) {}

    @Put()
    public async update(
        @Body() additionalCost: UpdateAdditionalCostDto,
        @Res() res: Response
    ): Promise<void> {
        await this.additionalCostService.update(additionalCost);
        res.status(204).send();
    }
}
