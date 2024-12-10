import { SuccessDto } from '@dto/shared.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { AdditionalCostsService } from 'src/services/additional-costs.service';
import { AdditionalCostsController } from './additional-costs.controller';

describe('AdditionalCostsController', () => {
    let controller: AdditionalCostsController;
    let service: AdditionalCostsService;

    const mockAdditionalCostsService = {
        update: jest.fn().mockResolvedValue({ success: true } as SuccessDto),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AdditionalCostsController],
            providers: [{ provide: AdditionalCostsService, useValue: mockAdditionalCostsService }],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({
                canActivate: jest.fn(() => true),
            })
            .compile();

        controller = module.get<AdditionalCostsController>(AdditionalCostsController);
        service = module.get<AdditionalCostsService>(AdditionalCostsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call AdditionalCostsService.update with the correct data', async () => {
        const dto: UpdateAdditionalCostDto = {
            _id: new ObjectId(),
            cost: 0,
        };
        const result = await controller.change(dto);

        expect(service.update).toHaveBeenCalledWith(dto);
        expect(result).toEqual({ success: true });
    });

    it('should throw an error if AdditionalCostsService.update fails', async () => {
        const dto: UpdateAdditionalCostDto = {
            _id: new ObjectId(),
            cost: 0,
        };
        jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Update failed'));

        await expect(controller.change(dto)).rejects.toThrow('Update failed');
    });
});
