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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceController = void 0;
const http_errors_1 = require("http-errors");
const express_1 = require("express");
const mongoose_query_parser_1 = require("mongoose-query-parser");
const http_status_codes_1 = require("http-status-codes");
const crud_interface_1 = require("../interfaces/crud.interface");
class ResourceController {
    constructor(modelSchema) {
        this.modelSchema = modelSchema;
    }
    /**
     * Apply routes of CRUD operations
     * If no options available then it will apply all CRUD operations
     *
     * @param {ICrudRouteOptions[]} [options=[]]
     * @returns {Router}
     */
    applyRoutes(options = []) {
        const router = (0, express_1.Router)();
        // apply all routes if not provided
        if (options.length === 0) {
            options = [
                { operation: crud_interface_1.CrudOperations.GetAll },
                { operation: crud_interface_1.CrudOperations.Create },
                { operation: crud_interface_1.CrudOperations.GetOne },
                { operation: crud_interface_1.CrudOperations.Update },
                { operation: crud_interface_1.CrudOperations.Delete }
            ];
        }
        // apply routes depending on options
        options.forEach(o => {
            const middleware = o.middleware || [];
            switch (o.operation) {
                case crud_interface_1.CrudOperations.GetAll:
                    router.get('/', middleware, this.getAll());
                    break;
                case crud_interface_1.CrudOperations.Create:
                    router.post('/', middleware, this.create());
                    break;
                case crud_interface_1.CrudOperations.GetOne:
                    router.get('/:id', middleware, this.getOne());
                    break;
                case crud_interface_1.CrudOperations.Update:
                    router.put('/:id', middleware, this.update());
                    router.patch('/:id', middleware, this.update());
                    break;
                case crud_interface_1.CrudOperations.Delete:
                    router.delete('/:id', middleware, this.delete());
                    break;
            }
        });
        return router;
    }
    // #region CRUD methods
    /**
     * Get all resources paginated
     */
    getAll() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const queryOptions = this.parseQueryParameters(req);
                let resources;
                // get resources as list
                resources = yield this.modelSchema
                    .find(queryOptions.query)
                    .select(queryOptions.options.select)
                    .populate(queryOptions.options.populate)
                    .exec();
                return res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .json(resources);
            }
            catch (e) {
                next ? next(e) : res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(e);
            }
        });
    }
    /**
     * Create a new resource model
     */
    create() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = yield new this.modelSchema(req.body)
                    .save();
                return res
                    .status(http_status_codes_1.StatusCodes.CREATED)
                    .json(resource);
            }
            catch (e) {
                next ? next(e) : res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(e);
            }
        });
    }
    /**
     * Get one resource model by Id
     *
     * @param {string} [id] Model id to be retrieved
     * @returns
     */
    getOne(id) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const modelId = id || req.params.id;
                const queryOptions = this.parseQueryParameters(req);
                const resource = yield this.modelSchema
                    .findOne({ _id: modelId })
                    .select(queryOptions.options.select)
                    .populate(queryOptions.options.populate)
                    .orFail(new http_errors_1.NotFound())
                    .exec();
                return res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .json(resource);
            }
            catch (e) {
                next ? next(e) : res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(e);
            }
        });
    }
    /**
     * Update one resource model by Id
     *
     * @param {string} [id] Model id to be modified
     * @param {string[]} [blacklist=[]] List of properties to ignore
     * @returns
     */
    update(id, blacklist = []) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const modelId = id || req.params.id;
                // delete blacklisted properties from body
                const defaultBlacklist = ['_id', 'createdAt', 'updatedAt', ...blacklist];
                for (const key of defaultBlacklist) {
                    delete req.body[key];
                }
                const resource = yield this.modelSchema
                    .findOneAndUpdate({ _id: modelId }, req.body, { new: true, runValidators: true, context: 'query' })
                    .orFail(new http_errors_1.NotFound())
                    .exec();
                return res
                    .status(http_status_codes_1.StatusCodes.OK)
                    .json(resource);
            }
            catch (e) {
                next ? next(e) : res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(e);
            }
        });
    }
    /**
     * Delete one resource model by Id
     *
     * @param {string} [id] Model id to be deleted
     */
    delete(id) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const modelId = id || req.params.id;
                yield this.modelSchema
                    .findOneAndDelete({ _id: modelId })
                    .orFail(new http_errors_1.NotFound())
                    .exec();
                return res
                    .sendStatus(http_status_codes_1.StatusCodes.NO_CONTENT);
            }
            catch (e) {
                next ? next(e) : res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(e);
            }
        });
    }
    // #endregion CRUD methods
    // --------------------------------------
    // #region Helper methods
    /**
     * Parse all query params from URL
     *
     * @protected
     * @param {Request} req
     * @param {string[]} [blacklist=[]]
     * @param {string} [skipKey='page']
     * @param {string} [limitKey='perPage']
     * @returns {{ query: QueryOptions['filter'], options: PaginateOptions }}
     */
    parseQueryParameters(req, blacklist = [], skipKey = 'page', limitKey = 'perPage') {
        const queryOptions = new mongoose_query_parser_1.MongooseQueryParser({ limitKey, skipKey, blacklist })
            .parse(req.query);
        return {
            query: queryOptions.filter,
            options: {
                select: queryOptions.select,
                sort: queryOptions.sort,
                populate: queryOptions.populate,
                page: queryOptions.skip || 1,
                lean: false,
                leanWithId: false,
                limit: queryOptions.limit || 10,
            }
        };
    }
}
exports.ResourceController = ResourceController;
