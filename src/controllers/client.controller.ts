import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Get, Param, Put, UseFilters, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { ClientDto, UpdateClientContactDto } from 'src/dto/client.dto';
import { ParseObjectIdPipe, SuccessDto } from 'src/dto/shared.dto';
import { ClientFacade } from 'src/facades/client.facade';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { ClientService } from 'src/services/client.service';

@Controller('client')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class ClientController {
    public constructor(
        private readonly clientService: ClientService,
        private readonly clientFacade: ClientFacade
    ) {}

    @Get()
    public async getAll(): Promise<ClientDto[]> {
        return this.clientFacade.getAll();
    }

    @Put('contact/:id')
    public async updateContact(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Body() { contact }: UpdateClientContactDto
    ): Promise<SuccessDto> {
        return this.clientService.updateContact(id, contact);
    }
}
