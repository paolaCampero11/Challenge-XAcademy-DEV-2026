import {IsString, IsInt, IsIn, IsNotEmpty, IsOptional, Min, Max, Matches, MinLength} from 'class-validator'

export class CreatePlayerDto{
    @IsString()
    @IsNotEmpty({message: 'El nombre es obligatorio'})
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @Matches(/^[a-zA-ZáéíóúñÑ\s]+$/, { 
        message: 'El nombre solo puede contener letras y espacios' 
    })
    name: string

    @IsNotEmpty({message: 'La posición es obligatoria'})
    @IsIn(['GK', 'RB', 'RWB', 'CB', 'LB', 'LWB', 'CDM', 'CM', 'CAM', 'RM', 'RW', 'LM', 'LW', 'RF', 'CF', 'LF', 'ST'],
        {message: 'La posicion debe estar entre: GK, RB, RWB, CB, LB, LWB, CDM, CM, CAM, RM, RW, LM, LW, RF, CF, LF, ST'}
    )
    position: string

    @IsNotEmpty({message: 'El club es obligatorio'})
    @MinLength(3, {message: 'El club debe tener al menos 3 caracteres'})
    club: string

    @IsNotEmpty({message: 'La calificación es obligatoria'})
    @Min(1, {message: 'La calificación debe ser mayor a cero'})
    @Max(99, {message: 'La calificación debe ser menor a 100'})
    rating: number

    @IsNotEmpty({message: 'La nacionalidad es obligatoria'})
    @MinLength(4,{message: 'La nacionalidad debe tener al menos 4 caracteres'})
    nationality: string

    @IsOptional() 
    @IsInt()
    @Min(0, {message: 'La velocidad debe ser mayor o igual a 0'})
    @Max(100, {message: 'La velocidad debe ser menor o igual a 100 '})
    speed: number

    @IsOptional() 
    @IsInt()
    @Min(0, {message: 'El tiro debe ser mayor o igual a 0'})
    @Max(100, {message: 'El tiro debe ser menor o igual a 100'})
    shooting: number

    @IsOptional() 
    @IsInt()
    @Min(0, {message: 'El regate debe ser mayor o igual a 0'})
    @Max(100, {message: 'El regate debe ser menor o igual a 100'})
    dribbling: number

    @IsOptional() 
    @IsInt()
    @Min(0, {message: 'El pase debe ser mayor o igual a 0'})
    @Max(100, {message: 'El pase debe ser menor o igual a 100'})
    passing: number
}