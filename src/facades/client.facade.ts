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
            const clients = await this.clientService.getAll();
            const res = await Promise.all(
                clients.map(async (client) => {
                    const orders = await this.orderService.getByClientId(client._id);
                    const purchases = await Promise.all(
                        orders.flatMap((order) =>
                            order.variants.map((variant) =>
                                this.variantFacade.getVariantInfo(
                                    variant._id,
                                    `${variant.quantity}/${variant.price}`
                                )
                            )
                        )
                    );
                    return { ...client, purchases };
                })
            );
            return plainToInstance(ClientDto, res, { excludeExtraneousValues: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all clients');
            return [];
        }
    }
}
