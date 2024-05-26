import { IsString, IsUUID, IsNumber } from 'class-validator';

export class ProfesorDto {
    @IsString()
    name: string;

    @IsNumber()
    cedula: number;

    @IsString()
    grupoInvestigacion: string;

    @IsNumber()
    numeroExtension: number;

}