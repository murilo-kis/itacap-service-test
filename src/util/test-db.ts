import {getLogger} from "../loggerFactory";
import {getPrimaryPool} from "../db";


export async function testDB() {
    const log = getLogger("util.test-db")
    try {
        const pool = getPrimaryPool();
        await pool.getConnection();
    } catch (e) {
        log.error("DB is not properly configured");
        throw e;
    }
    log.info("Successfully connected to DB")
}