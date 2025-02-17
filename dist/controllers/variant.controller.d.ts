import { SuccessDto } from '@dto/shared.dto';
import {
    CanSaveVariantDto,
    CanSaveVariantResponseDto,
    UpdateVariantDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { VariantFacade } from 'src/facades/variant.facade';
export declare class VariantController {
    private variantFacade;
    constructor(variantFacade: VariantFacade);
    getAll(): Promise<VariantLockupDto[]>;
    updateVariant(createVariantDto: UpdateVariantDto): Promise<SuccessDto>;
    canSaveVariants(body: CanSaveVariantDto): Promise<CanSaveVariantResponseDto>;
}
