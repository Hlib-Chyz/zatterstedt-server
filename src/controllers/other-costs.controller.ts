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
import { ObjectId } from 'mongodb';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { DeleteGetDto, ParseObjectIdPipe, SuccessDto } from 'src/dto/shared.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { OtherCostsService } from 'src/services/other-costs.service';

@Controller('other-costs')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class OtherCostsController {
    public constructor(private readonly otherCostsService: OtherCostsService) {}

    @Get()
    public async getAll(): Promise<OtherCostDto[]> {
        return this.otherCostsService.getAll();
    }

    @Post()
    public async create(
        @Body()
        otherCost: CreateOtherCostDto
    ): Promise<SuccessDto> {
        return this.otherCostsService.create(otherCost);
    }

    @Put()
    public async update(@Body() fixedCost: UpdateOtherCostDto): Promise<SuccessDto> {
        return this.otherCostsService.update(fixedCost);
    }

    @Delete(':id')
    public async delete(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<DeleteGetDto> {
        return this.otherCostsService.delete(id);
    }
}
