import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDto, OrderDto } from 'src/dto/order.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { OrdersService } from 'src/services/orders.service';

@Controller('orders')
export class OrdersController {
    public constructor(private readonly ordersService: OrdersService) {}

    @Get()
    public async getAll(): Promise<OrderDto[]> {
        return this.ordersService.getAll();
    }

    @Post()
    public async create(
        @Body()
        order: CreateOrderDto
    ): Promise<SuccessDto> {
        return this.ordersService.add(order);
    }
}
