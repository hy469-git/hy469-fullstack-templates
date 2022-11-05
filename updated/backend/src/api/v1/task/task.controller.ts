import { Request, Response, NextFunction, Router } from 'express';
// import { DIContainer, MinioService, SocketsService } from '@app/services';
// import { logger } from '../../../utils/logger';
import { ITask, TaskModel } from '../../../models';
import { TasksService } from '../../../services/tasks.service';
import { ResourceController } from '../../shared';

export class TaskController {
    constructor() {
    }
    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/all', this.getTasks);
        // .post('/create', this.postTask);

        return router;
    }

    /**
     * Sends a example message containing all tasks back as a response
     */
    public getTasks(req: Request, res: Response) {
        // const tasksService = new TasksService();
        console.info('getTasks request print message');
        const allTasks = new TasksService().getAll()(req, res);
        res.json(allTasks);
    }

    public postTask(req: Request, res: Response) {
        const tasksService = new TasksService();
        console.info('postTask request print message');
        const task = tasksService.create()(req, res);
        res.json(task);
    }
}
