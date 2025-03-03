import { ClientSession, Model, Types } from 'mongoose';
import { SetRealizedPartyDto } from 'src/dto/stock.dto';
import { StockDocument } from 'src/schemas/stock.schema';
import { CreateStockType } from 'src/types/stock.types';
import { ErrorService } from './error.service';
export declare class StockService {
    private stockModel;
    private readonly errorService;
    constructor(stockModel: Model<StockDocument>, errorService: ErrorService);
    getByVariantId(variantId: Types.ObjectId): Promise<StockDocument>;
    deleteManyByVariantIds(variantIds: Types.ObjectId[], session: ClientSession): Promise<void>;
    add(stock: CreateStockType, session: ClientSession): Promise<void>;
    increaseSold(
        variantId: Types.ObjectId,
        quantity: number | undefined,
        session: ClientSession
    ): Promise<void>;
    updateRealizedParty(realizedPartyDto: SetRealizedPartyDto): Promise<void>;
    decreaseRealizedParty(
        variantId: Types.ObjectId,
        amount: number,
        session: ClientSession
    ): Promise<void>;
}
