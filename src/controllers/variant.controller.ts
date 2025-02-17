import { SuccessDto } from '@dto/shared.dto';
import {
    CanSaveVariantDto,
    CanSaveVariantResponseDto,
    UpdateVariantDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { VariantFacade } from 'src/facades/variant.facade';

@Controller('variant')
@UseGuards(JwtAuthGuard)
export class VariantController {
    public constructor(private variantFacade: VariantFacade) {}

    @Get()
    public async getAll(): Promise<VariantLockupDto[]> {
        return this.variantFacade.getAll();
    }

    @Post()
    public async updateVariant(@Body() createVariantDto: UpdateVariantDto): Promise<SuccessDto> {
        return this.variantFacade.updateVariant(createVariantDto);
    }

    @Post('can-save-variants')
    public async canSaveVariants(
        @Body() body: CanSaveVariantDto
    ): Promise<CanSaveVariantResponseDto> {
        return this.variantFacade.canSaveVariants(body);
    }
}
