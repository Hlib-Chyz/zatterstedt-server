import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { SuccessDto } from 'src/dto/shared.dto';
import { CreateStockDto, SetRealizedPartyDto } from 'src/dto/stock.dto';
import { Stock } from 'src/schemas/stock.schema';
import { ErrorService } from './error.service';
export declare class StockService {
    private stockModel;
    private readonly errorService;
    constructor(stockModel: Model<Stock>, errorService: ErrorService);
    getByVariantId(variantId: ObjectId): Promise<Stock>;
    deleteManyByVariantIds(variantIds: ObjectId[]): Promise<SuccessDto>;
    add(stock: CreateStockDto): Promise<SuccessDto>;
    increaseSold(variantId: ObjectId, quantity?: number): Promise<SuccessDto>;
    updateRealizedParty(realizedPartyDto: SetRealizedPartyDto): Promise<SuccessDto>;
    decreaseRealizedParty(variantId: ObjectId, amount: number): Promise<SuccessDto>;
}
