import { Test, TestingModule } from '@nestjs/testing';
import { PropuestaService } from './propuesta.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity/proyecto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';
describe('PropuestaService', () => {
  let service: PropuestaService;
  let propuestaRepository: Repository<PropuestaEntity>;
  let proyectoRepository: Repository<ProyectoEntity>;
  let propuesta: PropuestaEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PropuestaService],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    propuestaRepository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    await propuestaRepository.clear();
    await proyectoRepository.clear();
    const propuestasList = [];
    for (let i = 0; i < 5; i++) {
      const propuesta: PropuestaEntity = await propuestaRepository.save({
        titulo: faker.lorem.sentence(),
        descripcion: faker.lorem.paragraph(),
        palabraClave: faker.lorem.word(),
      });
      propuestasList.push(propuesta);
    }
    propuesta = propuestasList[0];
  };

  it('findOne should return a propuesta by ID', async () => {
    const storedPropuesta: PropuestaEntity = await service.findOne(propuesta.id);
    expect(storedPropuesta).not.toBeNull();
    expect(storedPropuesta.titulo).toEqual(propuesta.titulo);
  });

  it('findOne should throw an exception for an invalid propuesta ID', async () => {
    await expect(service.findOne("0"))
      .rejects.toEqual(new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND));
  });

  it('create should create a new propuesta', async () => {
    const propuesta: PropuestaEntity = {
      id: "",
      titulo: faker.lorem.sentence(),
      descripcion: faker.lorem.paragraph(),
      palabraClave: faker.lorem.word(),
      profesor: null,
      proyecto: null
    };

    const newPropuesta: PropuestaEntity = await service.create(propuesta);
    expect(newPropuesta).not.toBeNull();

    const storedPropuesta: PropuestaEntity = await propuestaRepository.findOne({ where: { id: newPropuesta.id } });
    expect(storedPropuesta).not.toBeNull();
    expect(storedPropuesta.titulo).toEqual(newPropuesta.titulo);
  });

  it('create should throw an exception if the title is missing', async () => {
    const propuesta: PropuestaEntity = {
      id: "",
      titulo: "",
      descripcion: faker.lorem.paragraph(),
      palabraClave: faker.lorem.word(),
      profesor: null,
      proyecto: null
    };

    await expect(service.create(propuesta))
      .rejects.toEqual(new BusinessLogicException("La propuesta no tiene titulo", BusinessError.PRECONDITION_FAILED));
  });

  it('delete should remove a propuesta', async () => {
    const propuestaToRemove: PropuestaEntity = await propuestaRepository.save({
      titulo: faker.lorem.sentence(),
      descripcion: faker.lorem.paragraph(),
      palabraClave: faker.lorem.word(),
    });

    await service.delete(propuestaToRemove.id);

    const deletedPropuesta: PropuestaEntity = await propuestaRepository.findOne({ where: { id: propuestaToRemove.id } });
    expect(deletedPropuesta).toBeNull();
  });

  it('delete should throw an exception if the propuesta has a project', async () => {
    const proyecto = await proyectoRepository.save({
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      url: faker.internet.url(),
    });

    const propuestaWithProject: PropuestaEntity = await propuestaRepository.save({
      titulo: faker.lorem.sentence(),
      descripcion: faker.lorem.paragraph(),
      palabraClave: faker.lorem.word(),
      proyecto: proyecto,
    });

    await expect(service.delete(propuestaWithProject.id))
      .rejects.toEqual(new BusinessLogicException("La propuesta no se puede eliminar porque tiene un proyecto", BusinessError.NOT_FOUND));
  });

  it('addProyectoPropuesta should add a project to a propuesta', async () => {
    const proyecto = await proyectoRepository.save({
      fechaInicio: faker.date.past(),
      fechaFin: faker.date.future(),
      url: faker.internet.url(),
    });

    const updatedPropuesta = await service.addProyectoPropuesta(propuesta.id, proyecto.id);
    expect(updatedPropuesta.proyecto).toEqual(proyecto);
  });
});
