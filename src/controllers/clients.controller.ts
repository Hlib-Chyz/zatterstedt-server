import { Body, Controller, Get, Param, Put, UseFilters } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ClientDto, UpdateClientContactsDto } from 'src/dto/client.dto';
import { ParseObjectIdPipe, SuccessDto } from 'src/dto/shared.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { ClientsService } from 'src/services/clients.service';

@Controller('clients')
@UseFilters(new HttpExceptionFilter())
export class ClientsController {
    public constructor(private readonly clientsService: ClientsService) {}

    @Get()
    public async getAllClients(): Promise<ClientDto[]> {
        return this.clientsService.getAll();
    }

    @Put('contacts/:id')
    public async setContactsInfo(
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @Body() { contacts }: UpdateClientContactsDto
    ): Promise<SuccessDto> {
        return this.clientsService.setContactsInfo(id, contacts);
    }
}
