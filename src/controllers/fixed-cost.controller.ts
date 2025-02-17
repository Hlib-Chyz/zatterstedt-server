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
import { FixedCost } from '@schemas/fixed-cost.schema';
import { FixedCostService } from '@services/fixed-cost.service';
import { ObjectId } from 'mongodb';
import { CreateFixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
import { DeleteGetDto, ParseObjectIdPipe, SuccessDto } from 'src/dto/shared.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('fixed-cost')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class FixedCostController {
    public constructor(private readonly fixedCostService: FixedCostService) {}

    @Get()
    public async getAll(): Promise<FixedCost[]> {
        return this.fixedCostService.getAll();
    }

    @Post()
    public async add(
        @Body()
        fixedCost: CreateFixedCostDto
    ): Promise<SuccessDto> {
        return this.fixedCostService.add(fixedCost);
    }

    @Put()
    public async update(@Body() fixedCost: UpdateFixedCostDto): Promise<SuccessDto> {
        return this.fixedCostService.update(fixedCost);
    }

    @Delete(':id')
    public async delete(@Param('id', ParseObjectIdPipe) id: ObjectId): Promise<DeleteGetDto> {
        return this.fixedCostService.delete(id);
    }
}
