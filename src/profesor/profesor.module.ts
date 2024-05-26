import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity/profesor.entity';
import { ProfesorController } from './profesor.controller';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';

@Module({
  providers: [ProfesorService],
  imports: [TypeOrmModule.forFeature([ProfesorEntity, PropuestaEntity])],
  controllers: [ProfesorController],
})
export class ProfesorModule {
  constructor(private readonly profesorService: ProfesorService) {}
}
