import "reflect-metadata";
import { injectable } from 'inversify';
import { ResourceController } from '../api/shared';
import { ITask, TaskModel } from '../models';


@injectable()
export class TasksService extends ResourceController<ITask> {

    constructor() { super(TaskModel) }
}
