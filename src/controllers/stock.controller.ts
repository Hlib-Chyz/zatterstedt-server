import { SuccessDto } from '@dto/shared.dto';
import { SetRealizedPartyDto } from '@dto/stock.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { StockService } from '@services/stock.service';

@Controller('stock')
@UseGuards(JwtAuthGuard)
export class StockController {
    public constructor(private stockService: StockService) {}

    @Put('realized-party')
    public async updateRealizedParty(@Body() body: SetRealizedPartyDto): Promise<SuccessDto> {
        return this.stockService.updateRealizedParty(body);
    }
}
