import "reflect-metadata";
import { injectable } from 'inversify';
import { ResourceController } from '../../shared';
import { ITask, TaskModel } from './task.model';


@injectable()
export class TasksService extends ResourceController<ITask> {

    constructor() { super(TaskModel) }
}