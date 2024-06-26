import { ProfesorEntity } from '../../profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from '../../proyecto/proyecto.entity/proyecto.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class PropuestaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    palabraClave: string;

    @ManyToOne(() => ProfesorEntity, profesor => profesor.propuestas, { onDelete: 'CASCADE' })
    profesor: ProfesorEntity;


    @OneToOne(() => ProyectoEntity, proyecto => proyecto.propuesta)
    @JoinColumn()
    proyecto: ProyectoEntity;
}
