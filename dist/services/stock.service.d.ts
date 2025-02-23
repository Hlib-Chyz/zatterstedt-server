import { Model, Types } from 'mongoose';
import { SuccessDto } from 'src/dto/shared.dto';
import { SetRealizedPartyDto } from 'src/dto/stock.dto';
import { StockDocument } from 'src/schemas/stock.schema';
import { CreateStockType } from 'src/types/stock.types';
import { ErrorService } from './error.service';
export declare class StockService {
    private stockModel;
    private readonly errorService;
    constructor(stockModel: Model<StockDocument>, errorService: ErrorService);
    getByVariantId(variantId: Types.ObjectId): Promise<StockDocument>;
    deleteManyByVariantIds(variantIds: Types.ObjectId[]): Promise<SuccessDto>;
    add(stock: CreateStockType): Promise<SuccessDto>;
    increaseSold(variantId: Types.ObjectId, quantity?: number): Promise<SuccessDto>;
    updateRealizedParty(realizedPartyDto: SetRealizedPartyDto): Promise<SuccessDto>;
    decreaseRealizedParty(variantId: Types.ObjectId, amount: number): Promise<SuccessDto>;
}
