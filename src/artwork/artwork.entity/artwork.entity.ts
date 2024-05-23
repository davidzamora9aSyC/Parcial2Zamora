/* eslint-disable prettier/prettier */
/* archivo: src/artwork/artwork.entity.ts */
import { ExhibitionEntity } from "src/exhibition/exhibition.entity/exhibition.entity";
import { MuseumEntity } from "src/museum/museum.entity/museum.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ArtworkEntity {

   @PrimaryGeneratedColumn("uuid")
   id: string;
   @Column()
   name: string;
   @Column()
   year: number;
   @Column()
   description: string;
   @Column()
   type: string;
   @Column()
   mainImage: string;

   @ManyToOne(() => MuseumEntity, museum => museum.artworks)
   museum: MuseumEntity;

   @ManyToOne(() => ExhibitionEntity, exhibition => exhibition.artworks)
   exhibition: ExhibitionEntity;

}