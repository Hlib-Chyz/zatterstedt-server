import { SuccessDto } from '@dto/shared.dto';
import {
    CanSaveVariantsDto,
    CanSaveVariantsResponseDto,
    CreateVariantsDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { VariantFacade } from 'src/facades/variant.facade';

@Controller('variants')
@UseGuards(JwtAuthGuard)
export class VariantsController {
    public constructor(private variantFacade: VariantFacade) {}

    @Get()
    public async getVariants(): Promise<VariantLockupDto[]> {
        return this.variantFacade.getVariants();
    }

    @Post()
    public async setVariants(@Body() createVariantsDto: CreateVariantsDto): Promise<SuccessDto> {
        return this.variantFacade.setVariants(createVariantsDto);
    }

    @Post('can-save-variants')
    public async canSaveVariants(
        @Body() body: CanSaveVariantsDto
    ): Promise<CanSaveVariantsResponseDto> {
        return this.variantFacade.canSaveVariants(body);
    }
}
