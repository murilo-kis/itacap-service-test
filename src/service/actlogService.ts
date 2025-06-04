import {getActLog, getActlogsForCenter, updateActLogToRepo} from "../repo/actlogRepo";
import {Actlog, ActlogSchema, ActlogWeb, parseActlogForWeb} from "../models/actlogModel";
import {getLogger} from "../loggerFactory";
import {AssessmentUsage, AssessmentUsageDTO, parseDTOFromAssessmentUsage} from "../models/usageSchema";
import {ActlogReport} from "../models/actlogReport";
import {getUsagesForActlog, getUsageTypeMap} from "../repo/usageRepo";
import {ServiceError} from "../models/serviceError";
import {Center} from "../models/centerModel";
import {getCenter} from "../repo/centerRepo";

const log = getLogger('service.actlogService');

const getActlogWeb = async (assignedId: string): Promise<ActlogWeb | null> => {
    const actlog = await getActLog(assignedId);

    if (!actlog) {
        return null;
    }

    // For references to the parent that don't involve centerId
    const center: Center | undefined = await getCenter(actlog.centerId);

    return parseActlogForWeb(actlog, center);
}

const getActlogsForCenterWeb = async (centerAbbreviation: string): Promise<ActlogWeb[]> => {
    const actlogs = await getActlogsForCenter(centerAbbreviation);
    return actlogs.map((log: Actlog) => parseActlogForWeb(log));
}

/**
 * All the information needed to view the ActlogReportDetails page
 * @param assignedId
 */
const getActlogReportDetails = async (assignedId: string): Promise<ActlogReport | null> => {
    const actlog = await getActLog(assignedId);

    if (actlog == null) {
        log.warn(`Actlog not found for assignedId:[${assignedId}]`);
        throw new ServiceError("Actlog not found", 404);
    }

    const center: Center | undefined = await getCenter(actlog.centerId);

    const response = {
        actlog: parseActlogForWeb(actlog, center),
        usages: [] as AssessmentUsageDTO[],
    }

    // We need the usage, and general information

    // 1. Usage
    const assessmentUsages: AssessmentUsage[] = await getUsagesForActlog(actlog.assessmentId);
    const usageMap = await getUsageTypeMap();
    response.usages = assessmentUsages.map((usage: AssessmentUsage) => {
        if (!usage || !usage.usageId) {
            return undefined;
        }

        // Make sure the usageType exists for the ID we carry in our assessment usage
        const usageType = usageMap.get(usage.usageId);
        if (!usageType) {
            return undefined;
        }

        return parseDTOFromAssessmentUsage(usage, usageType)
    }).filter(value => !!value) as AssessmentUsageDTO[];

    return response;
}

const updateActlog = async (request: ActlogWeb): Promise<ActlogWeb> => {
    const oldActlog = await getActLog(request.assignedId);

    // Combine the old actlog, replace old variables with new!
    let {centerSymbol, ...newActlog} = {...oldActlog, ...request};

    // Data validation, easy peasy I think!!
    const actlogToSave: Actlog = ActlogSchema.parse(newActlog);

    // Update, then return with a web version of the actlog
    const savedLog = await updateActLogToRepo(actlogToSave);
    return parseActlogForWeb(savedLog, await getCenter(savedLog?.centerId)) as ActlogWeb;
}

export {
    getActlogsForCenterWeb,
    getActlogWeb,
    getActlogReportDetails,
    updateActlog
}