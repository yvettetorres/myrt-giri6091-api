import { Module } from '@nestjs/common';
import { TasksModule } from './task/infraestructure/persistence/task.module';

@Module({
  imports: [
    TasksModule
  ],
})
export class AppModule {}
