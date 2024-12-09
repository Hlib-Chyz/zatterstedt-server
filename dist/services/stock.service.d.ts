import { SuccessDto } from 'src/dto/shared.dto';
import { CreateStockDto, StockDto } from 'src/dto/stock.dto';
import { Stock } from 'src/entities/stock.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
export declare class StockService {
    private stockRepository;
    private readonly errorService;
    constructor(stockRepository: Repository<Stock>, errorService: ErrorService);
    getByVariantId(variantId: string): Promise<StockDto>;
    removeByVariantId(variantIds: string[]): Promise<SuccessDto>;
    add(stock: CreateStockDto): Promise<SuccessDto>;
    increaseSold(variantId: string, quantity?: number): Promise<SuccessDto>;
}
