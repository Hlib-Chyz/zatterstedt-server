import { CreateOrderDto, OrderVariantDto } from 'src/dto/order.dto';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { SuccessDto } from '@dto/shared.dto';
export declare class OrdersService {
    private ordersRepository;
    private readonly errorService;
    constructor(ordersRepository: Repository<Order>, errorService: ErrorService);
    getByVariantId(variantId: string): Promise<OrderVariantDto[]>;
    getOrdersByClientId(clientId: string): Promise<OrderVariantDto[]>;
    getAll(): Promise<Order[]>;
    add(clientId: string, order: CreateOrderDto, ordersLength: number): Promise<SuccessDto>;
}
