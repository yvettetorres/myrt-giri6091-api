
import { Module } from "@nestjs/common";
import { TaskController } from "@/task/infraestructure/controllers/task.controller";
import { CreateTaskUseCase } from "@/task/aplication/create-task.use-case";
import { GetTaskByIdUseCase } from "@/task/aplication/get-task-by-id.use-case";
import { ITaskRepositoryToken } from "@/task/domain/task.repository.interface";
import { TaskRepositoryImpl } from "@/task/infraestructure/persistence/task.repository.impl";
import { UpdateTaskUseCase } from "@/task/aplication/update-task.use.case";
import { DeleteTaskUseCase } from "@/task/aplication/delete.task.use-case";

@Module({
    controllers: [ TaskController ],
    providers: [
        CreateTaskUseCase,
        GetTaskByIdUseCase,
        UpdateTaskUseCase,
        DeleteTaskUseCase,
        {
            provide: ITaskRepositoryToken,
            useClass: TaskRepositoryImpl  // Cambiar si la DB cambia
        },
    ],
    exports: [ CreateTaskUseCase ]
})
export class TasksModule {}