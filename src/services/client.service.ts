import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model, Types } from 'mongoose';
import { CreateClientContactsDto } from 'src/dto/client.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Client, ClientDocument } from 'src/schemas/client.schema';
import { ErrorService } from './error.service';

@Injectable()
export class ClientService {
    public constructor(
        @InjectModel(Client.name) private clientModel: Model<Client>,
        private readonly errorService: ErrorService
    ) {}

    public async add(client: CreateClientContactsDto): Promise<Types.ObjectId> {
        try {
            const newClient = new this.clientModel(client);
            await newClient.save();
            return newClient._id;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add client');
            return {} as Types.ObjectId;
        }
    }

    public async getById(id: ObjectId): Promise<ClientDocument> {
        try {
            const client = await this.clientModel.findById(id).exec();
            if (!client) {
                throw new NotFoundException('Client not found');
            }
            return client;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add client');
            return {} as ClientDocument;
        }
    }

    public async updateContact(id: ObjectId, contact: string): Promise<SuccessDto> {
        try {
            const updatedClient = await this.clientModel.findByIdAndUpdate(id, { contact }).exec();
            if (!updatedClient) {
                throw new NotFoundException('Client not found');
            }
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update contact');
            return new SuccessDto({ success: false });
        }
    }

    public async getAll(): Promise<ClientDocument[]> {
        try {
            return await this.clientModel.find().exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all Clients');
            return [];
        }
    }
}
