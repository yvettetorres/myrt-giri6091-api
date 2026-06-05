
import { CreateTaskUseCase } from "@/task/aplication/create-task.use-case";
import { ITaskRepositoryToken } from "@/task/domain/task.repository.interface";
import type { ITaskRepository } from "@/task/domain/task.repository.interface";
import { Controller, Get, Post, Body, Inject } from "@nestjs/common";

@Controller("task")
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    @Inject(ITaskRepositoryToken) private readonly taskRepository: ITaskRepository,
  ) {}

  @Get()
  async findAll() {
    return this.taskRepository.findAll();
  }

  @Post()
  async create(@Body() body: { title: string; description: string }) {
    return this.createTaskUseCase.execute(body.title, body.description);
  }
}
