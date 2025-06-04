import {ActlogWeb} from "./actlogModel";
import {AssessmentUsageDTO} from "./usageSchema";

export type ActlogReport ={
    actlog: ActlogWeb,
    usages: AssessmentUsageDTO[]
}