import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';


describe('ProyectoService', () => {
  let service: ProyectoService;
  let proyectoRepository: Repository<ProyectoEntity>;
  let proyecto: ProyectoEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    await proyectoRepository.clear();
    const proyectosList = [];
    for (let i = 0; i < 5; i++) {
      const proyecto: ProyectoEntity = await proyectoRepository.save({
        fechaInicio: faker.date.past(),
        fechaFin: faker.date.future(),
        url: faker.internet.url(),
        estudiante: null, 
        propuesta: null, 
      });
      proyectosList.push(proyecto);
    }
    proyecto = proyectosList[0];
  };

  it('create should create a new proyecto', async () => {
    const proyecto: ProyectoEntity = {
      id: "",
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      url: faker.internet.url(),
      estudiante: null, 
      propuesta: null, 
    };

    const createdProyecto: ProyectoEntity = await service.create(proyecto);
    expect(createdProyecto).not.toBeNull();
    expect(createdProyecto.url).toEqual(proyecto.url);
  });

  it('create should throw an exception for a proyecto with invalid dates', async () => {
    const proyecto: ProyectoEntity = {
      id: "",
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), 
      url: faker.internet.url(),
      estudiante: null, 
      propuesta: null, 
    };

    await expect(service.create(proyecto))
      .rejects.toEqual(new BusinessLogicException("La propuesta tiene una fecha de finalizacion anterior a la de inicio", BusinessError.NOT_FOUND));
  });
});
