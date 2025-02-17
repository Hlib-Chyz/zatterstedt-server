import { CreateOrderDto, OrderDto } from 'src/dto/order.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { OrderFacade } from 'src/facades/order.facade';
export declare class OrderController {
    private readonly orderFacade;
    constructor(orderFacade: OrderFacade);
    getAll(): Promise<OrderDto[]>;
    create(order: CreateOrderDto): Promise<SuccessDto>;
}
