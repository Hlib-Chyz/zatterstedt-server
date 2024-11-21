import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Client } from 'src/entities/client.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { SuccessDto } from 'src/dto/shared.dto';
import { ClientDto, CreateClientContactsDto } from 'src/dto/client.dto';

@Injectable()
export class ClientsService {
    public constructor(
        @InjectRepository(Client) private clientsRepository: Repository<Client>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<ClientDto[]> {
        try {
            return await this.clientsRepository.find();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all clients');
            return [];
        }
    }

    public async add(client: CreateClientContactsDto): Promise<SuccessDto> {
        try {
            await this.clientsRepository.save(client);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add client');
            return { success: false };
        }
    }

    public async setContactsInfo(_id: ObjectId, contactsInfo: string): Promise<SuccessDto> {
        try {
            const client = await this.clientsRepository.findOne({
                where: { _id },
            });
            if (!client) {
                throw new NotFoundException('Client not found');
            }
            await this.clientsRepository.save({ _id, contacts: contactsInfo });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set contacts info');
            return { success: false };
        }
    }
}
