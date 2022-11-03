import { Request, Response, NextFunction, Router } from 'express';
// import { DIContainer, MinioService, SocketsService } from '@app/services';
// import { logger } from '../../../utils/logger';

export class ExampleController {

    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();

        router
            .get('/hello', this.getExample);

        return router;
    }

    /**
     * Sens a example message back as a response
     */
    public getExample(req: Request, res: Response) {
        console.info('getExample request print message');
        res.json({ message: 'hello' });
    }
}
