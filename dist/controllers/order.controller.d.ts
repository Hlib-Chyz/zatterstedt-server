import { Response } from 'express';
import { CreateOrderDto, OrderDto } from 'src/dto/order.dto';
import { OrderFacade } from 'src/facades/order.facade';
export declare class OrderController {
    private readonly orderFacade;
    constructor(orderFacade: OrderFacade);
    getAll(): Promise<OrderDto[]>;
    create(order: CreateOrderDto, res: Response): Promise<void>;
}
