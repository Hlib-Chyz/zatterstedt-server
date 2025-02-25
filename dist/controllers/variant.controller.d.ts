import {
    CanSaveVariantDto,
    CanSaveVariantResponseDto,
    UpdateVariantDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { Response } from 'express';
import { VariantFacade } from 'src/facades/variant.facade';
export declare class VariantController {
    private variantFacade;
    constructor(variantFacade: VariantFacade);
    getAll(): Promise<VariantLockupDto[]>;
    updateVariant(createVariantDto: UpdateVariantDto, res: Response): Promise<void>;
    canSaveVariants(body: CanSaveVariantDto): Promise<CanSaveVariantResponseDto>;
}
