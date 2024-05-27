
/* eslint-disable prettier/prettier */
/* archivo: src/estudiante/estudiante.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { ProyectoEntity } from '../proyecto/proyecto.entity/proyecto.entity';

@Injectable()
export class EstudianteService {
   constructor(
       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>,

       @InjectRepository(ProyectoEntity)
       private readonly proyectoRepository: Repository<ProyectoEntity>,

   ){}



   async findOne(id: string): Promise<EstudianteEntity> {
       const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({where: {id}, relations: ["proyecto"] } );
       if (!estudiante)
         throw new BusinessLogicException("The estudiante with the given id was not found", BusinessError.NOT_FOUND);
  
       return estudiante;
   }
  
   async create(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        if(estudiante.codigoEstudiante.toString().length!=10){
            throw new BusinessLogicException("El id del estudiante NO tiene 10 caracteres", BusinessError.PRECONDITION_FAILED);
        }
       return await this.estudianteRepository.save(estudiante);
   }

   async addProyectoEstudiante(idEstudiante: string, idProyecto: string): Promise<EstudianteEntity> {

    if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idEstudiante) || !/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idProyecto)) {
        throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'", BusinessError.BAD_REQUEST);
    }

    const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({ where: { id: idEstudiante }, relations: ['proyecto'] });
    if (!estudiante) {
        throw new BusinessLogicException("The student with the given id was not found", BusinessError.NOT_FOUND);
    }


    const proyecto: ProyectoEntity = await this.proyectoRepository.findOne({ where: { id: idProyecto } });
    if (!proyecto) {
        throw new BusinessLogicException("The project with the given id was not found", BusinessError.NOT_FOUND);
    }


    estudiante.proyecto = proyecto;


    return await this.estudianteRepository.save(estudiante);
    }

}