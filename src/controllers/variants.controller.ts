import { VariantLockupDto } from '@dto/variant.dto';
import { Controller, Get } from '@nestjs/common';
import { VariantsService } from 'src/services/variants.service';

@Controller('variants')
export class VariantsController {
    public constructor(private variantsService: VariantsService) {}

    @Get()
    public async getVariants(): Promise<VariantLockupDto[]> {
        return this.variantsService.getVariants();
    }
}
