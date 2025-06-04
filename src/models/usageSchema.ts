import {z} from "zod";


const AssessmentUsageSchema = z.object({
    usageId: z.number().int().positive().nullable(), // I madee this nullable so we don't run into errors when creating new rows
    usageType: z.number().int().positive(),
    assessmentId: z.number().int().positive(),
    consumption: z.number(),
    cost: z.number(),
    unit: z.string(),
    statusCd: z.string(),
});

const UsageTypeSchema = z.object({
    usageTypeId: z.number().int().positive(),
    usageGroup: z.string(),
    category: z.string()
});

type AssessmentUsage = z.infer<typeof AssessmentUsageSchema>;
type UsageType = z.infer<typeof UsageTypeSchema>;

type UsageTypeDTO = Omit<UsageType, "usageTypeId">;
type AssessmentUsageDTO = Omit<AssessmentUsage, "usageTypeId" | "assessmentId"> & {
    usageType: UsageTypeDTO
}

const parseDTOFromUsageType = (usageType: UsageType): UsageTypeDTO => {
    const {usageTypeId, ...response} = usageType;
    return response;
}

const parseDTOFromAssessmentUsage = (usage: AssessmentUsage, usageType: UsageType): AssessmentUsageDTO => {
    const {usageId, assessmentId, ...response} = usage;
    return {
        ...response,
        usageType: parseDTOFromUsageType(usageType)
    } as AssessmentUsageDTO;
}

export {
    AssessmentUsageSchema,
    UsageTypeSchema,
    AssessmentUsage,
    UsageType,
    AssessmentUsageDTO,
    UsageTypeDTO,
    parseDTOFromUsageType,
    parseDTOFromAssessmentUsage
}