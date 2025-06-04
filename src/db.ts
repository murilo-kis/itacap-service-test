import config from "./config";
import {getLogger} from "./loggerFactory";
import {Pool, PoolOptions} from "mysql2/promise";

const mysql = require('mysql2/promise');


const log = getLogger('db');

const pools = new Map();

const PRIMARY: PoolOptions = {
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    database: config.dbDatabase,
    waitForConnections: config.waitForConnections,
    connectionLimit: config.connectionLimit,
    maxIdle: config.maxIdle, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: config.idleTimeout, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: config.queueLimit,
    enableKeepAlive: config.enableKeepAlive,
    keepAliveInitialDelay: config.keepAliveInitialDelay,
}

/**
 * https://www.npmjs.com/package/mssql#connection-pools
 */
function getPool(name: string): Pool {
    if (!pools.has(name)) {
        log.info(`Config name:[${name}]=[${JSON.stringify(PRIMARY)}]`);
        // @ts-ignore
        const pool: Pool = mysql.createPool(PRIMARY);
        pools.set(name, pool);
    }
    return pools.get(name);
}

/**
 * Closes all the pools and removes them from the store
 */
const shutdownPools = async (): Promise<void> => {
    const pool: Pool = getPrimaryPool()
    log.info('Shutting down primary MySQL pools...');
    try {
        await pool.end();
        log.info('Closed primary MySQL pool.');
    } catch (e) {
        log.info("Failed to shutdown primary MySQL pool!", e);
    }
    log.info("Closed all MySQL pools.");
}

const getPrimaryPool = () => {
    return getPool('PRIMARY');
}

export {
    getPrimaryPool,
    shutdownPools
}