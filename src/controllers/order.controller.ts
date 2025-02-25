import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateOrderDto, OrderDto } from 'src/dto/order.dto';
import { OrderFacade } from 'src/facades/order.facade';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
    public constructor(private readonly orderFacade: OrderFacade) {}

    @Get()
    public async getAll(): Promise<OrderDto[]> {
        return this.orderFacade.getAll();
    }

    @Post()
    public async create(
        @Body()
        order: CreateOrderDto,
        @Res() res: Response
    ): Promise<void> {
        await this.orderFacade.add(order);
        res.status(204).send();
    }
}
