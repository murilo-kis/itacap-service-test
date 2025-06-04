import {getPrimaryPool} from "../db";
import {RowDataPacket} from "mysql2/promise";
import {NAICS, NAICSSchema} from "../models/naicsModel";

/**
 * Get sic codes. Note: This function is not intended to be called directly. Instead, use the getCenters function which is memoized!
 */
const getNAICSs = async (): Promise<NAICS[]> => {
    const pool = await getPrimaryPool();
    const [rows]: [RowDataPacket[], any] = await pool.query(
        `select *
         from sic_code
         where status_cd = ?`,
        'active'
    );
    return rows.map((row: RowDataPacket) => {
        return NAICSSchema.parse(
            {
                code: row.code,
                title: row.title,
                description: row.description,
            });
    });
}

export {
    getNAICSs,
}