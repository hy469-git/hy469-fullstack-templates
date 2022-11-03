"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleController = void 0;
const express_1 = require("express");
// import { DIContainer, MinioService, SocketsService } from '@app/services';
// import { logger } from '../../../utils/logger';
class ExampleController {
    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    applyRoutes() {
        const router = (0, express_1.Router)();
        router
            .get('/hello', this.getExample);
        return router;
    }
    /**
     * Sens a example message back as a response
     */
    getExample(req, res) {
        console.info('getExample request print message');
        res.json({ message: 'hello' });
    }
}
exports.ExampleController = ExampleController;
