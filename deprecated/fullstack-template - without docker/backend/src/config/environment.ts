export const config = {

  // application environment mode
  environment: process.env.ENVIRONMENT || 'development',

  // host domain options
  protocol: process.env.PROTOCOL || 'http',
  host: process.env.HOST || 'localhost',
  exposedPort: process.env.EXPOSED_PORT || 8080,
  port: 8080,

  // MongoDB connection options
  mongo: {
    uri: `mongodb://localhost:27017/`
  },

  // sockets options
  sockets: {
    path: '/socket.io-client'
  },

  // redis options
  redis: {
    host: 'localhost'
  },

  // minio options
  minio: {
    useMinio: true,
    host: 'localhost',
    port: '9000',
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
    bucketName: 'cs469'
  }

};


/**
 * Indicates whether process is in production mode
 *
 * @export
 * @returns {boolean}
 */
export function isProd(): boolean {
  return config.environment === 'production';
}

/**
 * Indicates whether process is in development mode
 *
 * @export
 * @returns {boolean}
 */
export function isDev(): boolean {
  return config.environment === 'development';
}

/**
 * Get full host domain
 * e.g. http://localhost:80
 *
 * @export
 * @returns {string}
 */
export function getHostDomain(): string {
  return `${config.protocol}://${config.host}:${config.exposedPort}`;
}
