import { Controller } from '@nestjs/common';
import { EstudianteService } from './Estudiante.service';
import { Get, Param, Post, Delete } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { EstudianteDto } from './estudiante.dto/estudiante.dto';
import { EstudianteEntity } from './estudiante.entity/estudiante.entity';
import { plainToInstance } from 'class-transformer';
import { Body } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { UseInterceptors } from '@nestjs/common';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}


    @Get(':estudianteId')
    async findOne(@Param('estudianteId') estudianteId: string) {
        return await this.estudianteService.findOne(estudianteId);
    }

    @Post()
    async create(@Body() estudianteDto: EstudianteDto) {
    const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDto);
        return await this.estudianteService.create(estudiante);
    }

    @Post(':estudianteId/proyectos/:proyectoId')
    async addProyectoEstudiante(@Param('estudianteId') estudianteId: string, @Param('proyectoId') proyectoId: string){
        return await this.estudianteService.addProyectoEstudiante(estudianteId, proyectoId);
    }

}