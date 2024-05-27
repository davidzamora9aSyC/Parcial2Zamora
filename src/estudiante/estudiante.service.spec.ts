import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity/proyecto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let estudianteRepository: Repository<EstudianteEntity>;
  let proyectoRepository: Repository<ProyectoEntity>;
  let estudiante: EstudianteEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    estudianteRepository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await estudianteRepository.clear();
    await proyectoRepository.clear();
    const proyecto = await proyectoRepository.save({
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      url: faker.internet.url(),
    });
    estudiante = await estudianteRepository.save({
      nombre: faker.name.fullName(),
      codigoEstudiante: faker.datatype.string(10),
      numCredsAprovados: faker.datatype.number({ min: 0, max: 150 }),
      proyecto: proyecto,
    });
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should create a new estudiante', async () => {
    const estudiante: EstudianteEntity = {
      id: "",
      nombre: faker.name.fullName(),
      codigoEstudiante: faker.datatype.string(10),
      numCredsAprovados: faker.datatype.number({ min: 0, max: 150 }),
      proyecto: null,
    };

    const createdEstudiante: EstudianteEntity = await service.create(estudiante);
    expect(createdEstudiante).not.toBeNull();
    expect(createdEstudiante.nombre).toEqual(estudiante.nombre);
  });

  it('create should throw an exception for an estudiante with invalid codigoEstudiante length', async () => {
    const estudiante: EstudianteEntity = {
      id: "",
      nombre: faker.name.fullName(),
      codigoEstudiante: faker.datatype.string(5),
      numCredsAprovados: faker.datatype.number({ min: 0, max: 150 }),
      proyecto: null,
    };

    await expect(service.create(estudiante))
      .rejects.toEqual(new BusinessLogicException("El id del estudiante NO tiene 10 caracteres", BusinessError.PRECONDITION_FAILED));
  });

  it('findOne should return a estudiante by id', async () => {
    const foundEstudiante = await service.findOne(estudiante.id);
    expect(foundEstudiante).not.toBeNull();
    expect(foundEstudiante.nombre).toEqual(estudiante.nombre);
  });

  it('findOne should throw an exception for an invalid estudiante id', async () => {
    await expect(service.findOne("0")).rejects.toEqual(new BusinessLogicException("The estudiante with the given id was not found", BusinessError.NOT_FOUND));
  });

  it('addProyectoEstudiante should add a proyecto to a estudiante', async () => {
    const newProyecto = await proyectoRepository.save({
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      url: faker.internet.url(),
    });

    const updatedEstudiante = await service.addProyectoEstudiante(estudiante.id, newProyecto.id);
    expect(updatedEstudiante.proyecto).toEqual(newProyecto);
  });

  it('addProyectoEstudiante should throw an exception for an invalid estudiante id', async () => {
    const newProyecto = await proyectoRepository.save({
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      url: faker.internet.url(),
    });

    await expect(service.addProyectoEstudiante(faker.datatype.uuid(), newProyecto.id))
      .rejects.toEqual(new BusinessLogicException("The student with the given id was not found", BusinessError.NOT_FOUND));
  });

  it('addProyectoEstudiante should throw an exception for an invalid proyecto id', async () => {
    await expect(service.addProyectoEstudiante(estudiante.id, faker.datatype.uuid()))
      .rejects.toEqual(new BusinessLogicException("The project with the given id was not found", BusinessError.NOT_FOUND));
  });
});
