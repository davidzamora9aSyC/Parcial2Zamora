
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';

@Injectable()
export class ProfesorService {
   constructor(
       @InjectRepository(ProfesorEntity)
       private readonly profesorRepository: Repository<ProfesorEntity>,
       
       @InjectRepository(PropuestaEntity)
       private readonly propuestaRepository: Repository<PropuestaEntity>,
   ){}

   async findOne(id: string): Promise<ProfesorEntity> {
       const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: {id}, relations: ["propuestas", 'propuestas.proyecto'] } );
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
    const profesor: ProfesorEntity = await this.profesorRepository.findOne({ where: { id }, relations: ['propuestas', 'propuestas.proyecto'] });
    if (!profesor) {
        throw new BusinessLogicException("Professor not found", BusinessError.NOT_FOUND);
    }
    
    if (Array.isArray(profesor.propuestas) && profesor.propuestas.length > 0) {
        for (const propuesta of profesor.propuestas) {
            if (propuesta.proyecto !== null) {
                throw new BusinessLogicException("The professor cannot be deleted since a project exists", BusinessError.PRECONDITION_FAILED);
            }
        }
    }

    await this.profesorRepository.remove(profesor);
    }


   async deleteByCedula(cedula: number) {
    const profesor: ProfesorEntity = await this.profesorRepository.findOne({where: { cedula }, relations: ['propuestas', 'propuestas.proyecto'] });
    if (!profesor) {
        throw new BusinessLogicException("Professor not found", BusinessError.NOT_FOUND);
    }
    
    if (Array.isArray(profesor.propuestas) && profesor.propuestas.length > 0) {
        for (const propuesta of profesor.propuestas) {
            if (propuesta.proyecto !== null) {
                throw new BusinessLogicException("The professor cannot be deleted since a project exists", BusinessError.PRECONDITION_FAILED);
            }
        }
    }

    await this.profesorRepository.remove(profesor);
    }

    async addPropuestaProfesor(idProfesor: string, idPropuesta: string): Promise<ProfesorEntity> {
        if (!/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idProfesor) || !/^[A-Za-z0-9]{8}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{12}$/.test(idPropuesta)) {
            throw new BusinessLogicException("Invalid id format. HINT: Valid UUID values are of the form 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF'", BusinessError.BAD_REQUEST);
        }

        const profesor: ProfesorEntity = await this.profesorRepository.findOne({ where: { id: idProfesor }, relations: ['propuestas', 'propuestas.proyecto'] });
        if (!profesor) {
            throw new BusinessLogicException("The professor with the given id was not found", BusinessError.NOT_FOUND);
        }

        const propuesta: PropuestaEntity = await this.propuestaRepository.findOne({ where: { id: idPropuesta } });
        if (!propuesta) {
            throw new BusinessLogicException("The proposal with the given id was not found", BusinessError.NOT_FOUND);
        }

        if (!profesor.propuestas) {
            profesor.propuestas = [];
        }

        profesor.propuestas.push(propuesta);

        return await this.profesorRepository.save(profesor);
    }
}