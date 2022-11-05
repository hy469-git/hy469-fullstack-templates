"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostDomain = exports.isDev = exports.isProd = exports.config = void 0;
exports.config = {
    // application environment mode
    environment: process.env.ENVIRONMENT,
    // host domain options
    protocol: process.env.PROTOCOL || 'http',
    host: process.env.HOST || 'localhost',
    exposedPort: process.env.EXPOSED_PORT || 80,
    port: 80,
    // MongoDB connection options
    mongo: {
        // uri: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/?authSource=admin`,
        uri: `mongodb://localhost:27017/?authSource=admin`,
        options: {
            dbName: process.env.DB_NAME,
            user: process.env.DB_ROOT_USERNAME,
            pass: process.env.DB_ROOT_PASSWORD,
        }
    },
    // sockets options
    sockets: {
        path: '/socket.io-client'
    },
    // redis options
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD
    },
    // minio options
    minio: {
        host: process.env.MINIO_HOST,
        port: process.env.MINIO_PORT,
        accessKey: process.env.MINIO_ACCESS_KEY,
        secretKey: process.env.MINIO_SECRET_KEY,
        bucketName: process.env.MINIO_BUCKET_NAME
    }
};
/**
 * Indicates whether process is in production mode
 *
 * @export
 * @returns {boolean}
 */
function isProd() {
    return exports.config.environment === 'production';
}
exports.isProd = isProd;
/**
 * Indicates whether process is in development mode
 *
 * @export
 * @returns {boolean}
 */
function isDev() {
    return exports.config.environment === 'development';
}
exports.isDev = isDev;
/**
 * Get full host domain
 * e.g. http://localhost:80
 *
 * @export
 * @returns {string}
 */
function getHostDomain() {
    return `${exports.config.protocol}://${exports.config.host}:${exports.config.exposedPort}`;
}
exports.getHostDomain = getHostDomain;
