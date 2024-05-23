import { Module } from '@nestjs/common';
import { MuseumArtworkService } from './museum-artwork.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MuseumEntity } from 'src/museum/museum.entity/museum.entity';
import { ArtworkEntity } from 'src/artwork/artwork.entity/artwork.entity';
import { MuseumArtworkController } from './museum-artwork.controller';

@Module({
  providers: [MuseumArtworkService],
  imports:  [TypeOrmModule.forFeature([MuseumEntity, ArtworkEntity])],
  controllers: [MuseumArtworkController],
})
export class MuseumArtworkModule {}
