import { Test, TestingModule } from '@nestjs/testing';
import { MuseumService } from './museum.service';

describe('MuseumService', () => {
  let service: MuseumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MuseumService],
    }).compile();

    service = module.get<MuseumService>(MuseumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
