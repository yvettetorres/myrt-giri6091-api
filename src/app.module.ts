import { Module } from '@nestjs/common';
import { TasksModule } from './task/infraestructure/persistence/task.module';
import { PrismaModule } from './prisma/prisma.module'; 
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TasksModule,
    AuthModule
  ],
})
export class AppModule {}
