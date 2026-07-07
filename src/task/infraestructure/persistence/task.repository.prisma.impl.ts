import { PrismaService } from '@/prisma/prisma.module';
import { Task } from '@/task/domain/task.entity';
import { ITaskRepository } from "@/task/domain/task.repository.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TaskRepositoryPrismaImpl implements ITaskRepository {
    
    constructor(private readonly prisma: PrismaService) { }
    
    async create(task: Task): Promise<any> { // 👈 Cambiamos temporalmente a Promise<any> para ver la respuesta cruda
        const createdTask = await this.prisma.task.create({
            data: {
                title: task.title,
                description: task.description,
                status: task.status,
                createdAt: task.createdAt
            }
        });

        return createdTask; // 👈 Retornamos directo lo que saca Prisma de la BD
    }

    async findAll(): Promise<any[]> {
        const tasks = await this.prisma.task.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return tasks;
    }

    async findById(id: number): Promise<any | null> {
        const task = await this.prisma.task.findUnique({
            where: { id }
        });

        return task;
    }

    async update(task: Task): Promise<any> {
        const updated = await this.prisma.task.update({
            where: { id: task.id },
            data: {
                title: task.title,
                description: task.description,
                status: task.status,
            }
        });

        return updated; 
    }

    async delete(id: number): Promise<boolean> {
        try {
            await this.prisma.task.delete({ where: { id } });
            return true;
        } catch (error) {
            return false;
        }
    }
}