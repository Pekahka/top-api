import { Test, TestingModule } from '@nestjs/testing';
// import { exec } from 'child_process';
import { getModelToken } from 'nestjs-typegoose';
import { RevievService } from './reviev.service';
import { Types } from 'mongoose'

describe('RevievService', () => {
  let service: RevievService;
  const exec = { exec: jest.fn() };
  const revievRepositoryFactory = () => ({
    find: () => exec
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RevievService,
        { useFactory: revievRepositoryFactory, provide: getModelToken('RevievModel') }
      ],
    }).compile();

    service = module.get<RevievService>(RevievService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByProductId working', async () => {
    const id = new Types.ObjectId().toHexString();
    revievRepositoryFactory().find().exec.mockResolvedValueOnce([{ productId: id }]);
    const res = await service.findByProductId(id);
    expect(res[0].productId).toBe(id);
  });

});
