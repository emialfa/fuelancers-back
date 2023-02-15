import { Test, TestingModule } from '@nestjs/testing';
import { ExpertController } from './expert.controller';

describe('TechnicianController', () => {
  let controller: ExpertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpertController],
    }).compile();

    controller = module.get<ExpertController>(ExpertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
