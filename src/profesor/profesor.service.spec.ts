import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;
  let profesor: ProfesorEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    await repository.clear();
    const profesoresList = [];
    for (let i = 0; i < 5; i++) {
      const profesor: ProfesorEntity = await repository.save({
        name: faker.name.fullName(),
        cedula: faker.datatype.number({ min: 10000000, max: 99999999 }),
        grupoInvestigacion: faker.helpers.arrayElement(['TICSW', 'IMAGINE', 'COMIT']),
        numeroExtension: faker.datatype.number({ min: 1000, max: 9999 }),
      });
      profesoresList.push(profesor);
    }
    profesor = profesoresList[0];
  }

  it('findOne should return a professor by ID', async () => {
    const storedProfesor: ProfesorEntity = await service.findOne(profesor.id);
    expect(storedProfesor).not.toBeNull();
    expect(storedProfesor.name).toEqual(profesor.name);
  });

  it('findOne should throw an exception for an invalid professor ID', async () => {
    await expect(service.findOne("0"))
      .rejects.toEqual(new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND));
  });

  it('create should create a new professor', async () => {
    const profesor: ProfesorEntity = {
      id: "",
      name: faker.name.fullName(),
      cedula: faker.datatype.number({ min: 10000000, max: 99999999 }),
      grupoInvestigacion: "TICSW",
      numeroExtension: faker.datatype.number({ min: 1000, max: 9999 }),
      propuestas: []
    };

    const newProfesor: ProfesorEntity = await service.create(profesor);
    expect(newProfesor).not.toBeNull();

    const storedProfesor: ProfesorEntity = await repository.findOne({ where: { id: newProfesor.id } });
    expect(storedProfesor).not.toBeNull();
    expect(storedProfesor.name).toEqual(newProfesor.name);
  });

  it('create should throw an exception for an invalid research group', async () => {
    const profesor: ProfesorEntity = {
      id: "",
      name: faker.name.fullName(),
      cedula: faker.datatype.number({ min: 10000000, max: 99999999 }),
      grupoInvestigacion: "INVALID_GROUP",
      numeroExtension: faker.datatype.number({ min: 1000, max: 9999 }),
      propuestas: []
    };

    await expect(service.create(profesor))
      .rejects.toEqual(new BusinessLogicException("The researching group is not valid", BusinessError.PRECONDITION_FAILED));
  });
});
