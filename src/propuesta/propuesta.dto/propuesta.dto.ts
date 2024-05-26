import { IsString, IsUUID, IsOptional } from 'class-validator';

export class PropuestaDto {
    @IsString()
    titulo: string;

    @IsString()
    descripcion: string;

    @IsString()
    palabraClave: string;

}
