import { SuccessDto } from '@dto/shared.dto';
import {
    CanSaveVariantsDto,
    CanSaveVariantsResponseDto,
    CreateVariantsDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { VariantFacade } from 'src/facades/variant.facade';
export declare class VariantsController {
    private variantFacade;
    constructor(variantFacade: VariantFacade);
    getVariants(): Promise<VariantLockupDto[]>;
    setVariants(createVariantsDto: CreateVariantsDto): Promise<SuccessDto>;
    canSaveVariants(body: CanSaveVariantsDto): Promise<CanSaveVariantsResponseDto>;
}
