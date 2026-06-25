import { Module } from '@nestjs/common';
import { TasksModule } from './task/infraestructure/persistence/task.module';
import { PrismaModule } from './prisma/prisma.module'; 


@Module({
  imports: [
    TasksModule
  ],
})
export class AppModule {}
