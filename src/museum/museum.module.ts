import { Module } from '@nestjs/common';
import { MuseumEntity } from './museum.entity/museum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuseumService } from './museum.service';
import { MuseumController } from './museum.controller';




@Module({
  providers: [MuseumService],
  imports: [TypeOrmModule.forFeature([MuseumEntity])],
  controllers: [MuseumController],
})
export class MuseumModule {
    constructor(private readonly museumService: MuseumService) {}
}
