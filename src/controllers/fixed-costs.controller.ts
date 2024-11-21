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
import { CreateFixedCostDto, FixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
import { DeleteGetDto, ParseObjectIdPipe, SuccessDto } from 'src/dto/shared.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FixedCostsService } from 'src/services/fixed-costs.service';

@Controller('fixed-costs')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class FixedCostsController {
    public constructor(private readonly fixedCostsService: FixedCostsService) {}

    @Get()
    public async getAll(): Promise<FixedCostDto[]> {
        return this.fixedCostsService.getAll();
    }

    @Post()
    public async create(
        @Body()
        fixedCost: CreateFixedCostDto
    ): Promise<SuccessDto> {
        return this.fixedCostsService.create(fixedCost);
    }

    @Put()
    public async update(@Body() fixedCost: UpdateFixedCostDto): Promise<SuccessDto> {
        return this.fixedCostsService.update(fixedCost);
    }

    @Delete(':id')
    public async delete(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<DeleteGetDto> {
        return this.fixedCostsService.delete(id);
    }
}
