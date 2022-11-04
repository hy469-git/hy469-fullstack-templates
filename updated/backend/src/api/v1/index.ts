import * as express from 'express';
import { ExampleController } from './example/example.controller';

const apiV1Router = express.Router();


apiV1Router
  // Example routes
  .use(
    '/example',
    new ExampleController().applyRoutes()
  );


export { apiV1Router };

