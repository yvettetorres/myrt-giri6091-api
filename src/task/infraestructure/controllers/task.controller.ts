
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

@ApiTags('Task')
@Controller({path: "task", version: "1"})
export class TaskController {

  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTaskByIdUseCase: GetTaskByIdUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    @Inject(ITaskRepositoryToken)
    private readonly taskRepository: ITaskRepository
    
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las tareas' })
  async findAll() {
    return this.taskRepository.findAll();
  }

  @Post()
    @ApiOperation({ summary: 'Crear una nueva tarea' })
    @ApiResponse({ status: 201, description: 'Creada correctamente' })
    async create(@Body() task: CreateTaskDto) {
        return this.createTaskUseCase.execute(task.title, task.description);
    }


    @Get(':id')
    @ApiOperation({ summary: 'Obtener una tarea por ID' })
    @ApiParam({ name: 'id', description: 'ID de la tarea', type: String })
    @ApiResponse({ status: HttpStatus.OK, description: 'Tarea encontrada' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Tarea no encontrada' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.getTaskByIdUseCase.execute(id);
    }


    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una tarea existente' })
    @ApiParam({ name: 'id', description: 'ID de la tarea (UUID)', })
   
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateTask: UpdateTaskDto) {
      return this.updateTaskUseCase.execute(id, updateTask);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar una tarea por ID' })
    @ApiParam({ name: 'id', description: 'ID de la tarea (UUID)', })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Tarea eliminada correctamente' })
    async delete(@Param('id', ParseIntPipe) id: number) {
      return this.deleteTaskUseCase.execute(id);
    }


}


