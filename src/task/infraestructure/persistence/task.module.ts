
import { Module } from "@nestjs/common";
import { TaskController } from "@/task/infraestructure/controllers/task.controller";
import { CreateTaskUseCase } from "@/task/aplication/create-task.use-case";
import { ITaskRepositoryToken } from "@/task/domain/task.repository.interface";
import { TaskRepositoryImpl } from "@/task/infraestructure/persistence/task.repository.impl";

@Module({
    controllers: [ TaskController ],
    providers: [
        CreateTaskUseCase,
        {
            provide: ITaskRepositoryToken,
            useClass: TaskRepositoryImpl  // Cambiar si la DB cambia
        },
    ],
    exports: [ CreateTaskUseCase ]
})
export class TasksModule {}