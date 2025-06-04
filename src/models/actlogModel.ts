import {z} from 'zod';
import {Center} from "./centerModel";

const ActlogSchema = z.object({
    assessmentId: z.number().int().positive(),
    assignedId: z.string(),
    sicCd: z.number().int().positive(),
    naicsCd: z.number().int().positive(),
    variationId: z.number().int().positive(),
    assessmentSourceId: z.number().int().positive(),
    centerId: z.number().int().positive(),
    assessmentDays: z.number().int().positive(),
    visitDate1: z.coerce.date().nullable(),
    visitDate2: z.coerce.date().nullable(),
    companyName: z.string(),
    contactName: z.string(),
    email: z.string(),
    phone: z.string(),
    phoneExt: z.string().nullable(),
    addressLine1: z.string(),
    addressLine2: z.string().nullable(),
    addressLine3: z.string().nullable(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    annualSales: z.coerce.number().positive(),
    numEmployees: z.number().int().positive(),
    plantArea: z.number().int().positive(),
    plantAreaUnit: z.string(),
    principalProducts: z.string().nullable(),
    annualProductionUnits: z.number().int().positive(),
    annualProductionHours: z.number().int().positive(),
    assessmentSourceOther: z.string().nullable(),
    assessmentUploadDate: z.coerce.date().nullable(),
    implementationUploadDate: z.coerce.date().nullable(),
    lastVisitDate: z.coerce.date().nullable(),
    budgetYear: z.string().max(4).nullable()
});

type Actlog = z.infer<typeof ActlogSchema>;

/**
 * @openapi
 * components:
 *   schemas:
 *     ActlogWeb:
 *       type: object
 *       description: Web-friendly representation of an Actlog, omitting internal database IDs (assessmentId, centerId, assessmentSourceId).
 *       properties:
 *         assignedId:
 *           type: string
 *           description: Assigned identifier for the actlog.
 *           example: AC0001
 *         sicCd:
 *           type: integer
 *           format: int32
 *           description: Standard Industrial Classification code.
 *           minimum: 1
 *           example: 1234
 *         naicsCd:
 *           type: integer
 *           format: int32
 *           description: North American Industry Classification System code.
 *           minimum: 1
 *           example: 56789
 *         variationId:
 *           type: integer
 *           format: int32
 *           description: Identifier for the variation.
 *           minimum: 1
 *           example: 1
 *         assessmentDays:
 *           type: integer
 *           format: int32
 *           description: Number of days for the assessment.
 *           minimum: 1
 *           example: 3
 *         visitDate1:
 *           type: string
 *           format: date-time
 *           description: First visit date.
 *           nullable: true
 *           example: 2023-01-15T10:00:00Z
 *         visitDate2:
 *           type: string
 *           format: date-time
 *           description: Second visit date.
 *           nullable: true
 *           example: 2023-01-20T14:30:00Z
 *         companyName:
 *           type: string
 *           description: Name of the company.
 *           example: Acme Corp
 *         contactName:
 *           type: string
 *           description: Name of the contact person.
 *           example: Jane Doe
 *         email:
 *           type: string
 *           format: email
 *           description: Contact email address.
 *           example: jane.doe@example.com
 *         phone:
 *           type: string
 *           description: Contact phone number.
 *           example: 555-123-4567
 *         phoneExt:
 *           type: string
 *           description: Phone extension.
 *           nullable: true
 *           example: "123"
 *         addressLine1:
 *           type: string
 *           description: Address Line 1.
 *           example: 123 Main St
 *         addressLine2:
 *           type: string
 *           description: Address Line 2.
 *           nullable: true
 *           example: Suite 100
 *         addressLine3:
 *           type: string
 *           description: Address Line 3.
 *           nullable: true
 *           example: Building B
 *         city:
 *           type: string
 *           description: City.
 *           example: Anytown
 *         state:
 *           type: string
 *           description: State (e.g., WA for Washington).
 *           example: WA
 *         zip:
 *           type: string
 *           description: Zip code.
 *           example: "98225"
 *         annualSales:
 *           type: number
 *           format: float
 *           description: Annual sales in USD.
 *           minimum: 0 # Zod's positive() means > 0, but OpenAPI minimum includes the value. Use exclusiveMinimum if strictly > 0.
 *           example: 1000000.50
 *         numEmployees:
 *           type: integer
 *           format: int32
 *           description: Number of employees.
 *           minimum: 1
 *           example: 50
 *         plantArea:
 *           type: integer
 *           format: int32
 *           description: Plant area in square units.
 *           minimum: 1
 *           example: 10000
 *         plantAreaUnit:
 *           type: string
 *           description: Unit of plant area (e.g., 'sqft').
 *           example: sqft
 *         principalProducts:
 *           type: string
 *           description: Principal products of the company.
 *           nullable: true
 *           example: Widgets, Gadgets
 *         annualProductionUnits:
 *           type: integer
 *           format: int32
 *           description: Annual production in units.
 *           minimum: 1
 *           example: 100000
 *         annualProductionHours:
 *           type: integer
 *           format: int32
 *           description: Annual production in hours.
 *           minimum: 1
 *           example: 2000
 *         assessmentSourceOther:
 *           type: string
 *           description: Other assessment source details.
 *           nullable: true
 *           example: Referral from partner company
 *         assessmentUploadDate:
 *           type: string
 *           format: date-time
 *           description: Date of assessment upload.
 *           nullable: true
 *           example: 2023-02-01T08:00:00Z
 *         implementationUploadDate:
 *           type: string
 *           format: date-time
 *           description: Date of implementation upload.
 *           nullable: true
 *           example: 2023-03-01T09:00:00Z
 *         lastVisitDate:
 *           type: string
 *           format: date-time
 *           description: Date of the last visit.
 *           nullable: true
 *           example: 2023-04-01T10:00:00Z
 *         budgetYear:
 *           type: string
 *           description: Budget year (4-digit string).
 *           maxLength: 4
 *           nullable: true
 *           example: "2023"
 *         centerSymbol:
 *           type: string
 *           description: Symbol representing the associated center.
 *           example: ABC
 */
type ActlogWeb = Omit<Actlog, "assessmentId" | "centerId" | "assessmentSourceId"> & {
    centerSymbol?: string;
};

/**
 * Use an actlog and a center to create a web-friendly actlog.
 * Note: Center is included so actlog has a reference to it's parent element, the center
 * @param actlog
 * @param center Center that this actlog belongs to
 */
const parseActlogForWeb = (actlog: Actlog, center: Center | undefined = undefined): ActlogWeb  => {
    let {
        assessmentId,
        centerId,
        // Separate database IDs from the actlog
        ...restOfActlog
    } = actlog;

    return {
        centerSymbol: center?.symbol ?? undefined,
        ...restOfActlog
    } as ActlogWeb;
}

export {
    ActlogSchema,
    Actlog,
    ActlogWeb,
    parseActlogForWeb
}
