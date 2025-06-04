import {Center, CenterSchema} from "../models/centerModel";
import memoize from "fast-memoize";
import {RowDataPacket} from "mysql2/promise";
import {getPrimaryPool} from "../db";
import {getLogger} from "../loggerFactory";

const log = getLogger('repo.centerRepo');

/**
 * Get all centers from the database. Note: This function is not intended to be called directly. Instead, use the getCenters function which is memoized!
 */
async function _getCenters(): Promise<Center[]> {
    const pool = await getPrimaryPool();
    const [rows]: [RowDataPacket[], any] = await pool.query(
        `select center_id, name, symbol, award_number, director_name
         from center
         where status_cd = ?`,
        'active'
    );
    return rows.map((row: RowDataPacket) => {
        return CenterSchema.parse(
            {
                id: row.center_id,
                name: row.name,
                symbol: row.symbol,
                award_number: row.award_number,
                director_name: row.director_name,
            });
    });
}

/**
 * Memoized version of the getCenters function.
 */
let memoizedGetCenters: (() => Promise<Center[]>) | undefined = undefined

/**
 * Get all centers.
 * @param reload - If true, forces a fresh load of centers from the database and updates the cache. Defaults to false (uses cached data if available).
 */
const getCenters = async (reload: boolean = false): Promise<Center[]> => {
    if (memoizedGetCenters == null || reload) {
        memoizedGetCenters = memoize(_getCenters);
        log.info(`Loaded centers.`);
    }
    return memoizedGetCenters();
}

const getCenter = async (centerId: number): Promise<Center | undefined> => {
    // Since getting all the centers is cached, we should get the center from that cache
    const centers: Center[] = await getCenters();
    const center: Center | undefined = centers.find(center => center.id === centerId);
    return center;
}

export {
    getCenters,
    getCenter
}