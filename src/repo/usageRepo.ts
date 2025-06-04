import {AssessmentUsage, AssessmentUsageSchema, UsageType, UsageTypeSchema} from "../models/usageSchema";
import {RowDataPacket} from "mysql2/promise";
import {getPrimaryPool} from "../db";
import {ServiceError} from "../models/serviceError";

/**
 * Gets all the Assessment Usage for an actlog
 */
const getUsagesForActlog = async (assessmentId: number): Promise<AssessmentUsage[]> => {
    const pool = await getPrimaryPool();
    const [rows]: [RowDataPacket[], any] = await pool.query(
        `select *
         from assessment_usage u
         where assessment_id = ?
           and status_cd = 'active'`,
        [assessmentId]
    );
    // @ts-ignore Shut up Typescript! I like having a separate row for collecting and return results
    const results = rows.map((row: RowDataPacket) =>
        _parseAssessmentUsage(row)
    ) as AssessmentUsage[];
    return results;
}

/**
 * Gets all the usage types
 * TODO: This can be cached
 */
const getUsageTypes = async (): Promise<UsageType[]> => {
    const pool = await getPrimaryPool();
    const [rows]: [RowDataPacket[], any] = await pool.query(
        `select *
         from usage_type u`
    );
    // @ts-ignore Shut up Typescript! I like having a separate row for collecting and return results
    const results = rows.map((row: RowDataPacket) =>
        _parseUsageType(row)
    ) as UsageType[];
    return results;
}

/**
 * Returns a map of usage types, using their IDs as keys.
 */
const getUsageTypeMap = async (): Promise<Map<number, UsageType>> => {
    const typeMap = new Map<number, UsageType>();
    const usageTypes: UsageType[] = await getUsageTypes();

    // Typical converting an array of things to a map of things
    usageTypes.forEach(usageType => {
        if (usageType && usageType.usageTypeId) {
            typeMap.set(usageType.usageTypeId, usageType);
        }
    });
    return typeMap;
}

function _parseAssessmentUsage(row: RowDataPacket): AssessmentUsage {
    try {
        return AssessmentUsageSchema.parse({
            usageId: row.usage_id,
            usageType: row.usage_type,
            assessmentId: row.assessment_id,
            consumption: Number(row.consumption), // node mysql drivers suck!!!
            cost: Number(row.cost), // node mysql drivers suck!!!
            unit: row.unit,
            statusCd: row.status_cd,
        });
    } catch (error) {
        console.error(`Error parsing usage row:`, row, error);

        // I need to find out how to do this better...
        throw new ServiceError(`Error parsing data`, 500);
    }
}

function _parseUsageType(row: RowDataPacket): UsageType {
    return UsageTypeSchema.parse({
        usageTypeId: row.usage_type_id,
        usageGroup: row.usage_group,
        category: row.category,
    });
}

export {
    getUsagesForActlog,
    getUsageTypes,
    getUsageTypeMap
}