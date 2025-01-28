import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateOrderDto, OrderDto } from 'src/dto/order.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { OrderFacade } from 'src/facades/order.facade';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
    public constructor(private readonly orderFacade: OrderFacade) {}

    @Get()
    public async getAll(): Promise<OrderDto[]> {
        return this.orderFacade.getAll();
    }

    @Post()
    public async create(
        @Body()
        order: CreateOrderDto
    ): Promise<SuccessDto> {
        return this.orderFacade.add(order);
    }
}
