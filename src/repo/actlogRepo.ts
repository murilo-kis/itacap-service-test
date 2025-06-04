import {getPrimaryPool} from "../db";
import {RowDataPacket} from "mysql2/promise";
import {Actlog, ActlogSchema} from "../models/actlogModel";
import {getLogger} from "../loggerFactory";
import {ServiceError} from "../models/serviceError";

/*
 * All of the parts of our backend that touches the DB/uses SQL should be contained in a Repository file, like this one for actlogs
 */

const log = getLogger('repo.actlogRepo');

/**
 * Get an activity log using assignedId
 * @param assignedId
 */
const getActLog = async (assignedId: string): Promise<Actlog | null> => {
    const pool = await getPrimaryPool();
    const [rows]: [RowDataPacket[], any] = await pool.query(
        `select *
         from assessment
         where assigned_id = ?
           and status_cd = ?`,
        [assignedId, 'active']
    );
    if (rows.length > 1) {
        log.warn(`Found more than one activity log for reportId:[${assignedId}]!`);
    }

    if (rows.length == 0) {
        throw new ServiceError(`Could not find activity log for reportId [${assignedId}]`, 404);
    }
    return _parseLog(rows[0]);
}

/**
 * Gets the activity logs for a given center by abbreviation.
 */
const getActlogsForCenter = async (symbol: string): Promise<Actlog[]> => {
    const pool = await getPrimaryPool();
    const [rows]: [RowDataPacket[], any] = await pool.query(
        `select *
         from assessment a
         where center_id in
               (select center_id from center where symbol = ?)
           and center_id = a.center_id`,
        [symbol, 'active']
    );
    const results = rows.map((row: RowDataPacket) =>
        _parseLog(row)
    ) as Actlog[];
    return results;
}

/**
 * Updates the Actlog
 * NOTE: I have purposefully prevented certain fields from being updat-able, such as the assessmentId and assignedId
 * NOTE: Chaning those variables would cause problems
 * @param actlog
 */
const updateActLogToRepo = async(actlog: Actlog): Promise<Actlog> => {
    const pool = await getPrimaryPool();
    const [response]: [any, any] = await pool.query(
        `update assessment
         set
             sic_cd = ?,
             naics_cd = ?,
             company_name = ?,
             contact_name = ?,
             email = ?,
             phone = ?,
             phone_ext = ?,
             addr_1 = ?,
             addr_2 = ?,
             addr_3 = ?,
             city = ?,
             state_cd = ?,
             postal_cd = ?,
             variation_id = ?,
             assessment_source_id = ?,
             assessment_source_other = ?,
             
             annual_sales = ?,
             number_of_employees = ?,
             plant_area = ?,
             plant_area_unit = ?,
             principal_products = ?,
             annual_production_units = ?,
             annual_production_hours = ?
         
         where assessment_id = ?`,
        [
            actlog.sicCd,
            actlog.naicsCd,
            actlog.companyName,
            actlog.contactName,
            actlog.email,
            actlog.phone,
            actlog.phoneExt,
            actlog.addressLine1,
            actlog.addressLine2,
            actlog.addressLine3,
            actlog.city,
            actlog.state,
            actlog.zip,
            actlog.variationId,
            actlog.assessmentSourceId,
            actlog.assessmentSourceOther,

            actlog.annualSales,
            actlog.numEmployees,
            actlog.plantArea,
            actlog.plantAreaUnit,
            actlog.principalProducts,
            actlog.annualProductionUnits,
            actlog.annualProductionHours,

            actlog.assessmentId,
        ]
    );

    // Did we update successfully?
    if (response.affectedRoles == 0) {
        throw new ServiceError(`Could not find activity log for [${actlog.assignedId}]`, 404);
    }

    // Awesome, get the updated row, we will return it as proof of the update
    const updatedRow = await getActLog(actlog.assignedId);
    if (!updatedRow) {
        log.error(`Uh oh? How did we affect the row and find ourselves unable to find it? That scares me quite badly!! [assessmentId:${actlog.assessmentId}`);
        throw new ServiceError(`Could not find activity log for [${actlog.assignedId}]`, 404);
    }

    return updatedRow;
}

// @ts-ignore
function _parseLog(row: RowDataPacket): Actlog {
    return ActlogSchema.parse(
        {
            assessmentId: row.assessment_id,
            assignedId: row.assigned_id,
            sicCd: row.sic_cd,
            naicsCd: row.naics_cd,
            variationId: row.variation_id,
            assessmentSourceId: row.assessment_source_id,
            centerId: row.center_id,
            assessmentDays: row.assessment_days,
            visitDate1: row.visit_date_1,
            visitDate2: row.visit_date_2,
            companyName: row.company_name,
            contactName: row.contact_name,
            email: row.email,
            phone: row.phone,
            phoneExt: row.phone_ext,
            addressLine1: row.addr_1,
            addressLine2: row.addr_2,
            addressLine3: row.addr_3,
            city: row.city,
            state: row.state_cd,
            zip: row.postal_cd,
            annualSales: row.annual_sales ? +row.annual_sales: null,
            numEmployees: row.number_of_employees,
            plantArea: row.plant_area,
            plantAreaUnit: row.plant_area_unit,
            principalProducts: row.principal_products,
            annualProductionUnits: row.annual_production_units,
            annualProductionHours: row.annual_production_hours,
            assessmentSourceOther: row.assessment_source_other,
            assessmentUploadDate: row.assessment_upload_date,
            implementationUploadDate: row.implementation_upload_date,
            lastVisitDate: row.last_visit_date,
            budgetYear: row.budget_year
        }) as Actlog;
}

export {
    getActLog,
    getActlogsForCenter,
    updateActLogToRepo,
}