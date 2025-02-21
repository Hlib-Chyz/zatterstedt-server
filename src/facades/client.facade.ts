import { ClientDto } from '@dto/client.dto';
import { Injectable } from '@nestjs/common';
import { ClientService } from '@services/client.service';
import { ErrorService } from '@services/error.service';
import { OrderService } from '@services/order.service';
import { plainToInstance } from 'class-transformer';
import { VariantFacade } from 'src/facades/variant.facade';

@Injectable()
export class ClientFacade {
    public constructor(
        private readonly variantFacade: VariantFacade,
        private readonly errorService: ErrorService,
        private readonly clientService: ClientService,
        private readonly orderService: OrderService
    ) {}

    public async getAll(): Promise<ClientDto[]> {
        try {
            const res: ClientDto[] = [];
            const clients = await this.clientService.getAll();
            for (const client of clients) {
                const orders = await this.orderService.getByClientId(client._id);
                const purchases: string[] = [];
                for (const order of orders) {
                    for (const variant of order.variants) {
                        const newPurchase = `${await this.variantFacade.getVariantInfo(variant._id, `${variant.quantity}/${variant.price}`)}`;
                        purchases.push(newPurchase);
                    }
                }
                res.push({ ...client, purchases });
            }
            return plainToInstance(ClientDto, res, { excludeExtraneousValues: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all clients');
            return [];
        }
    }
}
