
/* eslint-disable prettier/prettier */
/* archivo: src/proyecto/proyecto.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';


@Injectable()
export class ProyectoService {
   constructor(
       @InjectRepository(ProyectoEntity)
       private readonly proyectoRepository: Repository<ProyectoEntity>
   ){}

  
   async create(proyecto: ProyectoEntity): Promise<ProyectoEntity> {

    if(proyecto.fechaFin<proyecto.fechaInicio){
        throw new BusinessLogicException("La propuesta tiene una fecha de finalizacion anterior a la de inicio", BusinessError.PRECONDITION_FAILED);
    }
       return await this.proyectoRepository.save(proyecto);
   }


}