import { VariantLockupDto } from '@dto/variant.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { VariantsService } from 'src/services/variants.service';

@Controller('variants')
@UseGuards(JwtAuthGuard)
export class VariantsController {
    public constructor(private variantsService: VariantsService) {}

    @Get()
    public async getVariants(): Promise<VariantLockupDto[]> {
        return this.variantsService.getVariants();
    }
}
