import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {

    @ApiProperty({
        description: 'Título de la tarea',
        example: 'Esta es una tarea',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    projectId!: string;
    @ApiProperty({
        description: 'Descripción general de una tarea',
        example: 'Esta es una tarea',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    title!: string;


    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    description!: string;
}