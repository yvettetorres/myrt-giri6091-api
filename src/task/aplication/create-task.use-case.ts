// Capa de aplicación (caso de uso)

import { Inject, Injectable } from "@nestjs/common";
import { ITaskRepositoryToken } from "../domain/task.repository.interface";
import type{ ITaskRepository } from "../domain/task.repository.interface";

@Injectable()
export class CreateTaskUseCase {
    constructor(
        @Inject(ITaskRepositoryToken)
        private readonly taskRepository: ITaskRepository,
    ) {}
}