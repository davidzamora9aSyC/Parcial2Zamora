import { Column, JoinColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MuseumEntity } from 'src/museum/museum.entity/museum.entity';  
import { ArtworkEntity } from 'src/artwork/artwork.entity/artwork.entity';
import { SponsorEntity } from 'src/sponsor/sponsor.entity/sponsor.entity';

@Entity()
export class ExhibitionEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;
 
    @Column()
    name: string;
 
    @Column()
    description: string;

    @ManyToOne(() => MuseumEntity, museum => museum.exhibitions)
    museum: MuseumEntity;

    @OneToMany(() => ArtworkEntity, artwork => artwork.exhibition)
    artworks: ArtworkEntity[];

    @OneToOne(() => SponsorEntity, sponsor => sponsor.exhibition)
    @JoinColumn()
    sponsor: SponsorEntity;
}