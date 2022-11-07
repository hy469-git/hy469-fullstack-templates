import { Request, Response, NextFunction, Router } from 'express';
// import { DIContainer, MinioService, SocketsService } from '@app/services';
// import { logger } from '../../../utils/logger';
import { ITask, TaskModel } from '../../../models';
import { TasksService } from './tasks.service';
import { ResourceController } from '../../shared';

export class TaskController {
    private tasksService: TasksService = new TasksService();
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
            .get('/', this.getTasks)
            .get('/:id', this.getTaskById)
            .post('/', this.postTask)
            .put('/:id', this.updateTask)
            .delete('/:id', this.deleteTask);

        return router;
    }

    /**
     * Sends a message containing all tasks back as a response
     * @param req
     * @param res 
     */
    public getTasks(req: Request, res: Response) {
        const tasksService = new TasksService();
        console.info('getTasks request');
        const allTasks = tasksService.getAll()(req, res);
    }

    /**
     * Creates a new task
     * @param req
     * @param res
     */
    public postTask(req: Request, res: Response) {
        const tasksService = new TasksService();
        console.info('postTask request');
        const task = tasksService.create()(req, res);
    }

    /**
     * Delete task by id
     * @param req 
     * @param res 
     */
    public deleteTask(req: Request, res: Response) {
        const tasksService = new TasksService();
        console.info('deleteTask request');
        const task = tasksService.delete(req.params.id)(req, res);
    }


    /**
     * Update task by id
     * @param req 
     * @param res 
     */
    public updateTask(req: Request, res: Response) {
        const tasksService = new TasksService();
        console.info('updateTask request');
        const task = tasksService.update(req.params.id, req.body.blacklist)(req, res);
    }

    /**
     * Get single task by id
     * @param req 
     * @param res 
     */
    public getTaskById(req: Request, res: Response) {
        const tasksService = new TasksService();
        console.info('getTaskById request');
        const task = tasksService.getOne(req.params.id)(req, res);
    }
}
