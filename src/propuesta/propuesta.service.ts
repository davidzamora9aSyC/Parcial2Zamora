/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity/proyecto.entity';

@Injectable()
export class PropuestaService {
   constructor(
       @InjectRepository(PropuestaEntity)
       private readonly propuestaRepository: Repository<PropuestaEntity>,

       @InjectRepository(ProyectoEntity)
       private readonly proyectoRepository: Repository<ProyectoEntity>,
   ){}

   async findAll(): Promise<PropuestaEntity[]> {
       return await this.propuestaRepository.find({ relations: ["profesor", "proyecto"] });
   }

   async findOne(id: string): Promise<PropuestaEntity> {
       const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where: {id}, relations: ["profesor", "proyecto"] } );
       if (!propuesta)
         throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
  
       return propuesta;
   }
  
   async create(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
    if(propuesta.titulo=="" || !propuesta.titulo){
        throw new BusinessLogicException("La propuesta no tiene titulo", BusinessError.PRECONDITION_FAILED)
    }
       return await this.propuestaRepository.save(propuesta);
   }


   async delete(id: string) {
    const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({ where: { id }, relations: ['proyecto'] });
    if (!propuesta) {
        throw new BusinessLogicException("La propuesta no existe", BusinessError.NOT_FOUND);
    }
    if (propuesta.proyecto != null) {
        throw new BusinessLogicException("La propuesta no se puede eliminar porque tiene un proyecto", BusinessError.NOT_FOUND);
    }
    await this.propuestaRepository.remove(propuesta);
}


   
   async addProyectoPropuesta(idPropuesta: string, idProyecto: string): Promise<PropuestaEntity> {

    if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idPropuesta) || !/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idProyecto)) {
        throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'", BusinessError.BAD_REQUEST);
    }

    const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({ where: { id: idPropuesta }, relations: ['proyecto'] });
    if (!propuesta) {
        throw new BusinessLogicException("The propuesta with the given id was not found", BusinessError.NOT_FOUND);
    }


    const proyecto: ProyectoEntity = await this.proyectoRepository.findOne({ where: { id: idProyecto } });
    if (!proyecto) {
        throw new BusinessLogicException("The project with the given id was not found", BusinessError.NOT_FOUND);
    }


    propuesta.proyecto = proyecto;


    return await this.propuestaRepository.save(propuesta);
    }

}