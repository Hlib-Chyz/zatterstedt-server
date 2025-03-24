import { SetRealizedPartyDto } from '@dto/stock.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Put, Res, UseGuards } from '@nestjs/common';
import { StockService } from '@services/stock.service';
import { Response } from 'express';

@Controller('stock')
@UseGuards(JwtAuthGuard)
export class StockController {
    public constructor(private stockService: StockService) {}

    @Put('realized-party')
    public async updateRealizedParty(
        @Body() body: SetRealizedPartyDto,
        @Res() res: Response
    ): Promise<void> {
        await this.stockService.updateRealizedParty(body);
        res.status(204).send();
    }
}
