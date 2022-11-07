import * as express from 'express';
import { ExampleController } from './example/example.controller';
import { TaskController } from './task/task.controller';
import { TasksService } from './task/tasks.service';
const apiV1Router = express.Router();


apiV1Router
  // Example routes
  .use(
    '/example',
    new ExampleController().applyRoutes()
  )
  .use(
    '/tasks',
    new TaskController().applyRoutes()
  );


export { apiV1Router };

