import { Controller } from '@nestjs/common';
import { ProyectoService } from './Proyecto.service';
import { Get, Param, Post, Delete } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { ProyectoDto } from './proyecto.dto/proyecto.dto';
import { ProyectoEntity } from './proyecto.entity/proyecto.entity';
import { plainToInstance } from 'class-transformer';
import { Body } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { UseInterceptors } from '@nestjs/common';

@Controller('proyectos')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
    constructor(private readonly proyectoService: ProyectoService) {}


  @Post()
  async create(@Body() proyectoDto: ProyectoDto) {
    const proyecto: ProyectoEntity = plainToInstance(ProyectoEntity, proyectoDto);
    return await this.proyectoService.create(proyecto);
  }

}