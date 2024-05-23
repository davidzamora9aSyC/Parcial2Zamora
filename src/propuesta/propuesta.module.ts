import { Module } from '@nestjs/common';
import { PropuestaService } from './Propuesta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaEntity } from './Propuesta.entity/Propuesta.entity';

@Module({
  providers: [PropuestaService],
  imports: [TypeOrmModule.forFeature([PropuestaEntity])],
})
export class PropuestaModule {
  constructor(private readonly PropuestaService: PropuestaService) {}
}