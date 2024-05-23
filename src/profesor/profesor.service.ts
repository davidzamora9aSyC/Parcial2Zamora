
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';


@Injectable()
export class ProfesorService {
   constructor(
       @InjectRepository(ProfesorEntity)
       private readonly profesorRepository: Repository<ProfesorEntity>
   ){}

   async findOne(id: string): Promise<ProfesorEntity> {
       const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}, relations: ["propuesta"] } );
       if (!profesor)
         throw new BusinessLogicException("The profesor with the given id was not found", BusinessError.NOT_FOUND);
  
       return profesor;
   }
  
   async create(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        if(!(profesor.grupoInvestigacion =="TICSW" || profesor.grupoInvestigacion == "IMAGINE" || profesor.grupoInvestigacion == "COMIT" )){
            throw new BusinessLogicException("The researching group is not valid", BusinessError.PRECONDITION_FAILED);
        }else{
            return await this.profesorRepository.save(profesor);
        }
       
   }


   async delete(id: string) {
       const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{id}});
       let number = 0;
        profesor.propuestas.forEach(propuesta=> {
            if (propuesta.proyecto){
                number+=1;
            }
        });


       if (number ==0)
         throw new BusinessLogicException("The profesor cannot be deleted since a project exists", BusinessError.PRECONDITION_FAILED);
    
       await this.profesorRepository.remove(profesor);
   }

   async deleteByCedula(cedula: number) {
    const profesor: ProfesorEntity = await this.profesorRepository.findOne({where:{cedula}});
    let number = 0;
     profesor.propuestas.forEach(propuesta=> {
         if (propuesta.proyecto){
             number+=1;
         }
     });


    if (number ==0)
      throw new BusinessLogicException("The profesor cannot be deleted since a project exists", BusinessError.PRECONDITION_FAILED);
 
    await this.profesorRepository.remove(profesor);
}
}