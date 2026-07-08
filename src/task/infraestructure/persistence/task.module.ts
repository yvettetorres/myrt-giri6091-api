import { Module } from "@nestjs/common";
import { TaskController } from "@/task/infraestructure/controllers/task.controller";
import { CreateTaskUseCase } from "@/task/aplication/create-task.use-case";
import { GetTaskByIdUseCase } from "@/task/aplication/get-task-by-id.use-case";
import { UpdateTaskUseCase } from "@/task/aplication/update-task.use.case";
import { DeleteTaskUseCase } from "@/task/aplication/delete.task.use-case";
import { ITaskRepositoryToken } from "@/task/domain/task.repository.interface";
import { TaskRepositoryPrismaImpl } from "@/task/infraestructure/persistence/task.repository.prisma.impl";
import { PrismaModule } from "@/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [TaskController],
    providers: [
        CreateTaskUseCase,
        GetTaskByIdUseCase,
        UpdateTaskUseCase,
        DeleteTaskUseCase,
        {
            provide: ITaskRepositoryToken,
            useClass: TaskRepositoryPrismaImpl
        }
    ],
    exports: [CreateTaskUseCase]
})
export class TasksModule {}