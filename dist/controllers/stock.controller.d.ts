import { SuccessDto } from '@dto/shared.dto';
import { SetRealizedPartyDto } from '@dto/stock.dto';
import { StockService } from '@services/stock.service';
export declare class StockController {
    private stockService;
    constructor(stockService: StockService);
    updateRealizedParty(body: SetRealizedPartyDto): Promise<SuccessDto>;
}
