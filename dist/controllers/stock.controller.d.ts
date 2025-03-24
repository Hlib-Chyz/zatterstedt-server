import { SetRealizedPartyDto } from '@dto/stock.dto';
import { StockService } from '@services/stock.service';
import { Response } from 'express';
export declare class StockController {
    private stockService;
    constructor(stockService: StockService);
    updateRealizedParty(body: SetRealizedPartyDto, res: Response): Promise<void>;
}
