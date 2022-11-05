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
exports.MongoAdapter = void 0;
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = require("mongoose");
const environment_1 = require("../../config/environment");
class MongoAdapter {
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const defaultOptions = {
                useNewUrlParser: true,
                // useFindAndModify: false,          // use native `findOneAndUpdate()` rather than `findAndModify()`
                // useCreateIndex: true,             // Automatic index builds
                autoIndex: false,
                // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
                // reconnectInterval: 1000,          // Reconnect every 1s
                // bufferMaxEntries: 0,              // Fail when the driver is not connected
                connectTimeoutMS: 10000,
                socketTimeoutMS: 45000,
                family: 4,
                useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
            };
            // merge default options with config mongo options
            const options = lodash_1.default.merge(defaultOptions, environment_1.config.mongo.options);
            // Connect to DB
            yield (0, mongoose_1.connect)(environment_1.config.mongo.uri, options);
        });
    }
}
exports.MongoAdapter = MongoAdapter;
