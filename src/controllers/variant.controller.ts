import {
    CanSaveVariantDto,
    CanSaveVariantResponseDto,
    UpdateVariantDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
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
    public async updateVariant(
        @Body() createVariantDto: UpdateVariantDto,
        @Res() res: Response
    ): Promise<void> {
        await this.variantFacade.updateVariant(createVariantDto);
        res.status(204).send();
    }

    @Post('can-save-variants')
    public async canSaveVariants(
        @Body() body: CanSaveVariantDto
    ): Promise<CanSaveVariantResponseDto> {
        return this.variantFacade.canSaveVariants(body);
    }
}
