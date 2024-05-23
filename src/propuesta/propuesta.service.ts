/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';


@Injectable()
export class PropuestaService {
   constructor(
       @InjectRepository(PropuestaEntity)
       private readonly propuestaRepository: Repository<PropuestaEntity>
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
       const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({where:{id}});
       if (!propuesta.proyecto)
         throw new BusinessLogicException("La propuesta no se puede eliminar porque tiene un  proyecto", BusinessError.NOT_FOUND);
       await this.propuestaRepository.remove(propuesta);
   }
}