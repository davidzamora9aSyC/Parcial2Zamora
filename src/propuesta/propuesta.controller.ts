import { Controller } from '@nestjs/common';
import { PropuestaService } from './Propuesta.service';
import { Get, Param, Post, Delete } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { PropuestaDto } from './propuesta.dto/propuesta.dto';
import { PropuestaEntity } from './propuesta.entity/propuesta.entity';
import { plainToInstance } from 'class-transformer';
import { Body } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UseInterceptors } from '@nestjs/common';

@Controller('propuestas')
@UseInterceptors(BusinessErrorsInterceptor)
export class PropuestaController {
    constructor(private readonly propuestaService: PropuestaService) {}

    @Get()
    async findAll() {
    return await this.propuestaService.findAll();
    }

    @Get(':propuestaId')
    async findOne(@Param('propuestaId') propuestaId: string) {
    return await this.propuestaService.findOne(propuestaId);
    }

    @Post()
    async create(@Body() propuestaDto: PropuestaDto) {
        const propuesta: PropuestaEntity = plainToInstance(PropuestaEntity, propuestaDto);
        return await this.propuestaService.create(propuesta);
    }


    @Delete(':propuestaId')
    @HttpCode(204)
    async delete(@Param('propuestaId') propuestaId: string) {
    return await this.propuestaService.delete(propuestaId);
    }

    @Post(':propuestaId/proyectos/:proyectoId')
    async addProyectoPropuesta(@Param('propuestaId') propuestaId: string, @Param('proyectoId') proyectoId: string){
        return await this.propuestaService.addProyectoPropuesta(propuestaId, proyectoId);
    }

}