import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { OtherCostService } from '@services/other-cost.service';
import { ObjectId } from 'mongodb';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { DeleteGetDto, ParseObjectIdPipe, SuccessDto } from 'src/dto/shared.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('other-cost')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class OtherCostController {
    public constructor(private readonly otherCostService: OtherCostService) {}

    @Get()
    public async getAll(): Promise<OtherCostDto[]> {
        return this.otherCostService.getAll();
    }

    @Post()
    public async add(
        @Body()
        otherCost: CreateOtherCostDto
    ): Promise<SuccessDto> {
        return this.otherCostService.add(otherCost);
    }

    @Put()
    public async update(@Body() otherCost: UpdateOtherCostDto): Promise<SuccessDto> {
        return this.otherCostService.update(otherCost);
    }

    @Delete(':id')
    public async delete(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<DeleteGetDto> {
        return this.otherCostService.delete(id);
    }
}
