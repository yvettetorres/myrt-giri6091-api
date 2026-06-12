import { Task } from '@/task/domain/task.entity';
import { ITaskRepository } from '@/task/domain/task.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskRepositoryImpl implements ITaskRepository {

    async update(updateTask: Task): Promise<Task> {
       const index = this.tasks.findIndex(t => t.id === updateTask.id);
       this.tasks[index] = updateTask;
       return Promise.resolve(updateTask);
        // throw new Error('Method not implemented.');
    }
    async delete(id: string): Promise<boolean> {
        const index = this.tasks.findIndex(t => t.id == id);
        if (index === -1) return Promise.resolve(false);
        this.tasks.splice(index, 1);
        return Promise.resolve(true);
        //throw new Error('Method not implemented.');
    }
    private tasks: Task[] = [];

    async create(task: Task): Promise<Task> {
        this.tasks.push(task);
        return (task);
    }

    async findAll(): Promise<Task[]> {
        return this.tasks;
         
    }
    async findById(id: string): Promise<Task | null> {
        return this.tasks.find(task => task.id === id) || null;
         
    }

}

//! npm i --save class-validator class-transformer 