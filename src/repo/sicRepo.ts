import {getPrimaryPool} from "../db";
import {SIC, SICSchema} from "../models/sicModel";
import {RowDataPacket} from "mysql2/promise";

/**
 * Get sic codes. Note: This function is not intended to be called directly. Instead, use the getCenters function which is memoized!
 */
const getSICs = async (): Promise<SIC[]> => {
    const pool = await getPrimaryPool();
    const [rows]: [RowDataPacket[], any] = await pool.query(
        `select *
         from sic_code
         where status_cd = ?`,
        'active'
    );
    return rows.map((row: RowDataPacket) => {
        return SICSchema.parse(
            {
                code: row.code,
                office: row.office,
                industry_title: row.industry_title,
            });
    });
}

export {
    getSICs,
}


interface foo {
    bar: string;
    baz: number;
    qux: boolean;
}

const c = {
    bar2: 'hello',
    baz: 42,
    qux: true,
}