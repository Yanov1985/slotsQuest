import { Test, TestingModule } from '@nestjs/testing';
import { CasinosController } from './casinos.controller';

describe('CasinosController', () => {
  let controller: CasinosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasinosController],
    }).compile();

    controller = module.get<CasinosController>(CasinosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
