/**
 * Reference Data Service
 */

import memoize from "fast-memoize";

import {getLogger} from '../loggerFactory';
import {SIC} from "../models/sicModel";
import {getSICs as getSICsFromRepo} from "../repo/sicRepo";
import {NAICS} from "../models/naicsModel";
import {getNAICSs as getNAICSsFromRepo} from "../repo/naicsRepo";

const log = getLogger('service.referenceDataService');

// memoized function references
let memoizedGetSICs: (() => Promise<SIC[]>) | undefined = undefined;
let memoizedGetNAICSs: (() => Promise<NAICS[]>) | undefined = undefined;

/**
 * Get all SICs.
 * @param reload - If true, forces a fresh load of SICs from the database and updates the cache. Defaults to false (uses cached data if available).
 */
const getSICs = async (reload: boolean = false): Promise<SIC[]> => {
    if (memoizedGetSICs == null || reload) {
        memoizedGetSICs = memoize(getSICsFromRepo);
        const memoizedSICs = await memoizedGetSICs()
        log.info(`Loaded ${memoizedSICs.length} SICs.`);
    }
    return memoizedGetSICs();
}

/**
 * Get all NAICSs.
 * @param reload - If true, forces a fresh load of NAICSs from the database and updates the cache. Defaults to false (uses cached data if available).
 */
const getNAICSs = async (reload: boolean = false): Promise<NAICS[]> => {
    if (memoizedGetNAICSs == null || reload) {
        memoizedGetNAICSs = memoize(getNAICSsFromRepo);
        const memoizedNAICSs = await memoizedGetNAICSs()
        log.info(`Loaded ${memoizedNAICSs.length} NAICSs.`);
    }
    return memoizedGetNAICSs();
}

const getRefData = async (reload: boolean = false): Promise<any> => {
    return {
        'sic': await getSICs(reload),
        'naics': getNAICSs(reload)
    }
}

export {
    getRefData,
    getSICs,
    getNAICSs,
}