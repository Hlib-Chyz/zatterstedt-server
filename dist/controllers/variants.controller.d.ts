import { SuccessDto } from '@dto/shared.dto';
import { CanSaveVariantsDto, CanSaveVariantsResponseDto, CreateVariantsDto, VariantLockupDto } from '@dto/variant.dto';
import { VariantsService } from 'src/services/variants.service';
export declare class VariantsController {
    private variantsService;
    constructor(variantsService: VariantsService);
    getVariants(): Promise<VariantLockupDto[]>;
    setVariants(createVariantsDto: CreateVariantsDto): Promise<SuccessDto>;
    canSaveVariants(body: CanSaveVariantsDto): Promise<CanSaveVariantsResponseDto>;
}
