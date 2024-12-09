import { CreateOrderDto, OrderDto } from 'src/dto/order.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { OrdersService } from 'src/services/orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getAll(): Promise<OrderDto[]>;
    create(order: CreateOrderDto): Promise<SuccessDto>;
}
