import { CreateTaskUseCase } from "@/task/aplication/create-task.use-case";
import { DeleteTaskUseCase } from "@/task/aplication/delete.task.use-case";
import { GetTaskByIdUseCase } from "@/task/aplication/get-task-by-id.use-case";
import { UpdateTaskUseCase } from "@/task/aplication/update-task.use.case";
import { ITaskRepositoryToken } from "@/task/domain/task.repository.interface";
import type { ITaskRepository } from "@/task/domain/task.repository.interface";
import { Controller, Get, Post, Body, Inject, HttpStatus, Param, Patch, Delete, HttpCode, ParseIntPipe } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-taskdto";

import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../auth/jwt.guard';

@UseGuards(JwtGuard)
@ApiTags("tasks")
@Controller({path: "tasks", version: "1"})
export class TaskController {

    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly GetTaskByIdUseCase: GetTaskByIdUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,

        @Inject(ITaskRepositoryToken)
        private readonly taskRepository: ITaskRepository
        
    ) {}

    @Get()
    @ApiOperation({ summary: "Listar todas las tareas" })
    async findAll() {
        return this.taskRepository.findAll();
    }

    @Post()
    @ApiOperation({ summary: "Crea una nueva tarea" })
    @ApiResponse({ status: HttpStatus.CREATED, description: "Tarea creada exitosamente." })
    async create(@Body() task: CreateTaskDto) {
        // Corregido: Retornamos directo lo que genera el repositorio prisma para heredar el ID real
        return this.taskRepository.create(task as any);        
    }

    @Get(":id")
    @ApiOperation({ summary: "Obtiene una tarea por su ID" })
    @ApiParam({ name: "id", description: "ID de la tarea (UUID)" })
    @ApiResponse({ status: HttpStatus.OK, description: "La tarea ha sido encontrada exitosamente." })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "No se encontró una tarea con el ID proporcionado." })    
    async findOne(@Param("id", ParseIntPipe) id:number) {
        return this.GetTaskByIdUseCase.execute(id);
    }

    @Patch(":id")
    @ApiOperation({ summary: "Actualiza una tarea por ID" })
    @ApiParam({ name: "id", description: "ID de la tarea a actualizar (UUID)" })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateTask: UpdateTaskDto) {
        return this.updateTaskUseCase.execute(id, updateTask);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Elimina una tarea por ID" })
    @ApiParam({ name: "id", description: "ID de la tarea a eliminar (UUID)" })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: "Tarea eliminada " })
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.deleteTaskUseCase.execute(id);
    }
}