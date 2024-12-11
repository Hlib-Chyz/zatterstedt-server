import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { ClientDto, CreateClientContactsDto } from 'src/dto/client.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Client } from 'src/entities/client.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { Order } from '@entities/order.entity';
import { VariantsService } from '@services/variants.service';

@Injectable()
export class ClientsService {
    public constructor(
        @InjectRepository(Client) private clientsRepository: Repository<Client>,
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        private readonly variantsService: VariantsService,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<ClientDto[]> {
        try {
            const res: ClientDto[] = [];
            const clients = await this.clientsRepository.find();
            for (const client of clients) {
                const orders = await this.ordersRepository.find({
                    where: { clientId: client._id.toString() },
                });
                const purchases: string[] = [];
                for (const order of orders) {
                    for (const variant of order.variants) {
                        const newPurchase = `${await this.variantsService.getVariantInfo(variant._id, `${variant.quantity}/${variant.price}`)}`;
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

    public async getByClientId(clientId: string): Promise<Omit<ClientDto, 'purchases'>> {
        try {
            const client = await this.getClient(new ObjectId(clientId));
            return client;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all clients');
            return {} as never;
        }
    }

    public async add(client: CreateClientContactsDto): Promise<ObjectId> {
        try {
            const { _id } = await this.clientsRepository.save(client);
            return _id;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add client');
            return { success: false } as never;
        }
    }

    public async setContactsInfo(_id: ObjectId, contactsInfo: string): Promise<SuccessDto> {
        try {
            const client = await this.getClient(_id);
            await this.clientsRepository.save({ ...client, contacts: contactsInfo });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set contacts info');
            return { success: false };
        }
    }

    private async getClient(_id: ObjectId): Promise<Client> {
        const client = await this.clientsRepository.findOne({
            where: { _id },
        });
        if (!client) {
            throw new NotFoundException('Client not found');
        }
        return client;
    }
}
