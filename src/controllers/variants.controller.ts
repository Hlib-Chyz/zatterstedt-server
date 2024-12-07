import { SuccessDto } from '@dto/shared.dto';
import {
    CanSaveVariantsDto,
    CanSaveVariantsResponseDto,
    CreateVariantsDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { VariantsService } from 'src/services/variants.service';

@Controller('variants')
@UseGuards(JwtAuthGuard)
export class VariantsController {
    public constructor(private variantsService: VariantsService) {}

    @Get()
    public async getVariants(): Promise<VariantLockupDto[]> {
        return this.variantsService.getVariants();
    }

    @Post()
    public async setVariants(@Body() createVariantsDto: CreateVariantsDto): Promise<SuccessDto> {
        return this.variantsService.setVariants(createVariantsDto);
    }

    @Post('can-save-variants')
    public async canSaveVariants(
        @Body() body: CanSaveVariantsDto
    ): Promise<CanSaveVariantsResponseDto> {
        return this.variantsService.canSaveVariants(body);
    }
}
