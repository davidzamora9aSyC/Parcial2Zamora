
/* eslint-disable prettier/prettier */
/* archivo: src/estudiante/estudiante.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';


@Injectable()
export class EstudianteService {
   constructor(
       @InjectRepository(EstudianteEntity)
       private readonly estudianteRepository: Repository<EstudianteEntity>
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
}