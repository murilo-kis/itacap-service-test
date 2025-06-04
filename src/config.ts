interface Config {
    env: string;
    port: number;
    nodeEnv: string;
    jwtSecret: string;
    jwtExpiresIn: string;
    storageBucketName: string;
    dbUser: string;
    dbPassword: string;
    dbHost: string;
    dbPort: number;
    dbDatabase: string;
    waitForConnections: boolean;
    connectionLimit: number;
    maxIdle: number;
    idleTimeout: number;
    queueLimit: number;
    enableKeepAlive: boolean;
    keepAliveInitialDelay: number
}

const config: Config = {
    env: process.env.ENV || 'local',
    port: Number(process.env.PORT) || 8080,
    nodeEnv: process.env.NODE_ENV || 'local',
    jwtSecret: process.env.JWT_SECRET || '<JWT_SECRET>',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '12h',
    storageBucketName: process.env.STORAGE_BUCKET_NAME || '<STORAGE_BUCKET_NAME>',
    dbUser: process.env.DB_USER || 'sa',
    dbPassword: process.env.DB_PASSWORD || '<DB_PASSWORD>',
    dbHost: process.env.DB_HOST || '<DB_HOST>',
    dbPort: process.env.DB_PORT ? +process.env.DB_PORT : 3333,
    dbDatabase: process.env.DB_DATABASE || '<DB_DATABASE>',
    waitForConnections: process.env.WAIT_FOR_CONNECTIONS == "true",
    connectionLimit: process.env.CONNECTION_LIMIT ? +process.env.CONNECTION_LIMIT : 10,
    maxIdle: process.env.MAX_IDLE ? +process.env.MAX_IDLE : 10,
    idleTimeout: process.env.IDLE_TIMEOUT ? +process.env.IDLE_TIMEOUT : 60000,
    queueLimit: process.env.QUEUE_LIMIT ? +process.env.QUEUE_LIMIT : 0,
    enableKeepAlive: process.env.KEP_ALIVE == "true",
    keepAliveInitialDelay: process.env.KEEP_ALIVE_INITIAL_DELAY ? +process.env.KEEP_ALIVE_INITIAL_DELAY : 0,
};

export default config;
