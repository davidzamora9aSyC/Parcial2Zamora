import { Controller } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { Get, Param, Post, Delete } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { ProfesorDto } from './profesor.dto/profesor.dto';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { plainToInstance } from 'class-transformer';
import { Body } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { UseInterceptors } from '@nestjs/common';

@Controller('profesores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) {}

    @Get(':profesorId')
    async findOne(@Param('profesorId') profesorId: string) {
        return await this.profesorService.findOne(profesorId);
    }

    @Post()
    async create(@Body() profesorDto: ProfesorDto) {
        const profesor: ProfesorEntity = plainToInstance(ProfesorEntity, profesorDto);
        return await this.profesorService.create(profesor);
    }

    @Delete(':profesorId')
    @HttpCode(204)
    async delete(@Param('profesorId') profesorId: string) {
        return await this.profesorService.delete(profesorId);
    }

    @Delete('/cedula/:cedula')
    @HttpCode(204)
    async deleteByCedula(@Param('cedula') cedula: number) {
        return await this.profesorService.deleteByCedula(cedula);
    }

    @Post(':profesorId/propuestas/:propuestaId')
    async addPropuestaProfesor(@Param('profesorId') profesorId: string, @Param('propuestaId') propuestaId: string) {
        return await this.profesorService.addPropuestaProfesor(profesorId, propuestaId);
    }
}
