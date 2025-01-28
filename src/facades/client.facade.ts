import { ClientDto } from '@dto/client.dto';
import { Injectable } from '@nestjs/common';
import { ClientsService } from '@services/clients.service';
import { ErrorService } from '@services/error.service';
import { OrdersService } from '@services/orders.service';
import { VariantFacade } from 'src/facades/variant.facade';

@Injectable()
export class ClientFacade {
    public constructor(
        private readonly variantFacade: VariantFacade,
        private readonly errorService: ErrorService,
        private readonly clientsService: ClientsService,
        private readonly ordersService: OrdersService
    ) {}

    public async getAll(): Promise<ClientDto[]> {
        try {
            const res: ClientDto[] = [];
            const clients = await this.clientsService.getAll();
            for (const client of clients) {
                const orders = await this.ordersService.getOrdersByClientId(client._id.toString());
                const purchases: string[] = [];
                for (const order of orders) {
                    for (const variant of order.variants) {
                        const newPurchase = `${await this.variantFacade.getVariantInfo(variant._id, `${variant.quantity}/${variant.price}`)}`;
                        purchases.push(newPurchase);
                    }
                }
                res.push({ ...client, purchases });
            }
            return res;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all clients');
            return [];
        }
    }
}
