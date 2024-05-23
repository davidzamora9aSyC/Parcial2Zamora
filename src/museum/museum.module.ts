import { Module } from '@nestjs/common';
import { MuseumEntity } from './museum.entity/museum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuseumService } from './museum.service';




@Module({
  providers: [MuseumService],
  imports: [TypeOrmModule.forFeature([MuseumEntity])],
  //controllers: [RecursoEducativoController],
})
export class MuseumModule {}
