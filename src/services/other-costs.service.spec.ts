import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from '@dto/other-cost.dto';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { OtherCost } from 'src/entities/other-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { OtherCostsService } from './other-costs.service';

const mockRepository = (): Repository<OtherCost> =>
    ({
        find: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
        delete: jest.fn(),
    }) as unknown as Repository<OtherCost>;

const mockErrorService = (): ErrorService => ({
    throwError: jest.fn(),
});

describe('OtherCostsService', () => {
    let service: OtherCostsService;
    let repository: Repository<OtherCost>;
    let errorService: ErrorService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OtherCostsService,
                { provide: getRepositoryToken(OtherCost), useFactory: mockRepository },
                { provide: ErrorService, useFactory: mockErrorService },
            ],
        }).compile();

        service = module.get<OtherCostsService>(OtherCostsService);
        repository = module.get<Repository<OtherCost>>(getRepositoryToken(OtherCost));
        errorService = module.get<ErrorService>(ErrorService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it('should return an array of other costs', async () => {
            const mockOtherCosts: OtherCostDto[] = [
                { _id: new ObjectId(), name: 'Cost 1', date: '2024-01-01', cost: 100 },
            ];
            jest.spyOn(repository, 'find').mockResolvedValue(mockOtherCosts);

            const result = await service.getAll();
            expect(result).toEqual(mockOtherCosts);
        });

        it('should handle errors and call throwError', async () => {
            jest.spyOn(repository, 'find').mockRejectedValue(new Error('Database Error'));
            const result = await service.getAll();

            expect(errorService.throwError).toHaveBeenCalledWith(
                expect.any(Error),
                'Failed to get all other costs'
            );
            expect(result).toEqual([]);
        });
    });

    describe('create', () => {
        it('should create a new other cost and return success', async () => {
            const mockOtherCost = { name: 'New Cost', date: '2024-01-01', cost: 200 } as OtherCost;
            jest.spyOn(repository, 'save').mockResolvedValue(mockOtherCost);

            const result = await service.create(mockOtherCost);
            expect(result).toEqual({ success: true });
        });

        it('should handle errors and call throwError', async () => {
            jest.spyOn(repository, 'save').mockRejectedValue(new Error('Save Error'));
            const mockOtherCost: CreateOtherCostDto = {
                name: 'New Cost',
                date: '2024-01-01',
                cost: 200,
            };

            const result = await service.create(mockOtherCost);
            expect(errorService.throwError).toHaveBeenCalledWith(
                expect.any(Error),
                'Failed to create other costs'
            );
            expect(result).toEqual({ success: false });
        });
    });

    describe('update', () => {
        it('should update an existing other cost and return success', async () => {
            const mockOtherCost: UpdateOtherCostDto = {
                _id: new ObjectId(),
                name: 'Updated Cost',
                date: '2024-01-01',
                cost: 150,
            };
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockOtherCost);
            jest.spyOn(repository, 'save').mockResolvedValue(mockOtherCost);

            const result = await service.update(mockOtherCost);
            expect(result).toEqual({ success: true });
        });

        it('should throw NotFoundException if other cost is not found', async () => {
            const mockOtherCost: UpdateOtherCostDto = {
                _id: new ObjectId(),
                name: 'Updated Cost',
                date: '2024-01-01',
                cost: 150,
            };
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            const result = await service.update(mockOtherCost);
            expect(errorService.throwError).toHaveBeenCalledWith(
                new NotFoundException('Other cost not found'),
                'Failed to update other cost'
            );
            expect(result).toEqual({ success: false });
        });

        it('should handle errors and call throwError', async () => {
            jest.spyOn(repository, 'findOne').mockRejectedValue(new Error('Find Error'));
            const mockOtherCost: UpdateOtherCostDto = {
                _id: new ObjectId(),
                name: 'Updated Cost',
                date: '2024-01-01',
                cost: 150,
            };

            const result = await service.update(mockOtherCost);
            expect(errorService.throwError).toHaveBeenCalledWith(
                expect.any(Error),
                'Failed to update other cost'
            );
            expect(result).toEqual({ success: false });
        });
    });

    describe('delete', () => {
        it('should delete an existing other cost and return its id', async () => {
            const mockId = new ObjectId();
            jest.spyOn(repository, 'delete').mockResolvedValue({ raw: mockId });

            const result = await service.delete(mockId);
            expect(result).toEqual({ _id: mockId });
        });

        it('should handle errors and call throwError', async () => {
            const mockId = new ObjectId();
            jest.spyOn(repository, 'delete').mockRejectedValue(new Error('Delete Error'));

            const result = await service.delete(mockId);
            expect(errorService.throwError).toHaveBeenCalledWith(
                expect.any(Error),
                'Failed to delete cost field'
            );
            expect(result).toEqual({ _id: mockId });
        });
    });
});
