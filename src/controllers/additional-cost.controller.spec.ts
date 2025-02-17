import { SuccessDto } from '@dto/shared.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalCostService } from '@services/additional-cost.service';
import { UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { AdditionalCostController } from './additional-cost.controller';
import { Types } from 'mongoose';

describe('AdditionalCostController', () => {
    let controller: AdditionalCostController;
    let service: AdditionalCostService;

    const mockAdditionalCostService = {
        update: jest.fn().mockResolvedValue({ success: true } as SuccessDto),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AdditionalCostController],
            providers: [{ provide: AdditionalCostService, useValue: mockAdditionalCostService }],
        })
            .overrideGuard(JwtAuthGuard)
            .useValue({
                canActivate: jest.fn(() => true),
            })
            .compile();

        controller = module.get<AdditionalCostController>(AdditionalCostController);
        service = module.get<AdditionalCostService>(AdditionalCostService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call AdditionalCostService.update with the correct data', async () => {
        const dto: UpdateAdditionalCostDto = {
            _id: new Types.ObjectId(),
            cost: 0,
        };
        const result = await controller.update(dto);

        expect(service.update).toHaveBeenCalledWith(dto);
        expect(result).toEqual({ success: true });
    });

    it('should throw an error if AdditionalCostService.update fails', async () => {
        const dto: UpdateAdditionalCostDto = {
            _id: new Types.ObjectId(),
            cost: 0,
        };
        jest.spyOn(service, 'update').mockRejectedValueOnce(new Error('Update failed'));

        await expect(controller.update(dto)).rejects.toThrow('Update failed');
    });
});
