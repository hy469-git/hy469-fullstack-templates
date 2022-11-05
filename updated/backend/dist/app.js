"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
// import morgan from 'morgan';
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
// import methodOverride from 'method-override';
const http_errors_1 = require("http-errors");
const http_status_codes_1 = require("http-status-codes");
const api_1 = require("./api");
// import { logger } from './utils/logger';
const database_1 = require("./database");
const environment_1 = require("./config/environment");
// import { DIContainer, SocketsService, MinioService } from './services';
class App {
    constructor() { }
    /**
     * Initializes application and starts the server
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Setup and connect database
                yield this.setupDatabase();
                // Setup express and API routes
                this.app = yield this.setupExpressApp();
                const server = http_1.default.createServer(this.app);
                // // Start socket server
                // const socketService = DIContainer.get(SocketsService);
                // await socketService.start(server);
                // // Setup minio client
                // const minioService = DIContainer.get(MinioService);
                // await minioService.setup();
                // Finally start server
                server.listen(environment_1.config.port, () => {
                    console.info(`Server started in "${environment_1.config.environment}" mode. Available on: ${(0, environment_1.getHostDomain)()}`);
                });
            }
            catch (e) {
                console.error(`Failed to start server due to error: `, e);
                process.exit(-1);
            }
        });
    }
    // #region Private methods
    /**
     * Setup express application
     *
     * @private
     * @returns {Promise<express.Application>}
     */
    setupExpressApp() {
        return __awaiter(this, void 0, void 0, function* () {
            const application = (0, express_1.default)();
            application
                .set('port', environment_1.config.port)
                .set('env', environment_1.config.environment)
                .use((0, cors_1.default)())
                .use(body_parser_1.default.json({ limit: '5MB' }))
                .use(body_parser_1.default.urlencoded({ extended: true }));
            // setup primary app routes.
            application
                .use(yield api_1.Api.applyRoutes(application));
            // all other routes should return 405 error (Method Not Allowed)
            application
                .route('/*')
                .get((req, res) => { throw new http_errors_1.MethodNotAllowed(); });
            // global error handler
            // !it has to be the last
            application.use(this.handlerError);
            return application;
        });
    }
    /**
     * Setup and connect to database
     *
     * @private
     */
    setupDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // connect to database
                yield database_1.MongoAdapter.connect();
                console.info(`MongoDB is connected on ${environment_1.config.mongo.uri}`);
                const Str = mongoose_1.default.Schema.Types.String;
                Str.checkRequired((v) => v != null);
            }
            catch (e) {
                console.error(`MongoDB connection error: `, e);
                throw e;
            }
        });
    }
    /**
     * Middleware for handling errors
     *
     * @private
     * @param {*} error
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    handlerError(error, req, res, next) {
        let status = error.status || http_status_codes_1.INTERNAL_SERVER_ERROR;
        const code = error.code || error.name || 'InternalServerError';
        const message = error.message || 'Internal Server Error';
        const errors = error.errors || undefined;
        // // cast mongoose errors to bad request
        // if (error instanceof mongoose.Error.CastError
        //     || error instanceof mongoose.Error.ValidationError) {
        //     status = UNPROCESSABLE_ENTITY;
        // }
        res.status(status).json({ status, code, message, errors });
    }
}
exports.App = App;
