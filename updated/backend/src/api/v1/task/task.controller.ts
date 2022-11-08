import { Request, Response, NextFunction, Router } from 'express';
// import { DIContainer, MinioService, SocketsService } from '@app/services';
// import { logger } from '../../../utils/logger';
import { ITask, TaskModel } from './task.model';
import { TasksService } from './tasks.service';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';

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
    public async getTasks(req: Request, res: Response) {
        const tasksService = new TasksService();
        console.info('getTasks request');
        const allTasks = await tasksService.getAll(req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.OK)
            .json(allTasks);
    }

    /**
     * Creates a new task
     * @param req
     * @param res
     */
    public async postTask(req: Request, res: Response) {
        const tasksService = new TasksService();
        console.info('create request');
        const task = await tasksService.create(req, res);
        // you can process the data retrieved here before returning it to the client
        return res
            .status(StatusCodes.CREATED)
            .json(task);
    }

    /**
     * Delete task by id
     * @param req 
     * @param res 
     */
    public async deleteTask(req: Request, res: Response) {
        const tasksService = new TasksService();
        console.info('deleteTask request');
        const task = await tasksService.delete(req.params.id, req, res);
        return res
            .status(StatusCodes.OK)
            .json(task);
    }


    /**
     * Update task by id
     * @param req 
     * @param res 
     */
    public async updateTask(req: Request, res: Response) {
        const tasksService = new TasksService();
        console.info('updateTask request');
        const task = await tasksService.update(req.params.id, req.body.blacklist, req, res);
        return res
            .status(StatusCodes.OK)
            .json(task);
    }

    /**
     * Get single task by id
     * @param req 
     * @param res 
     */
    public async getTaskById(req: Request, res: Response) {
        const tasksService = new TasksService();
        console.info('getTaskById request');
        const task = await tasksService.getOne(req.params.id, req, res);
        return res
            .status(StatusCodes.OK)
            .json(task);
    }
}
