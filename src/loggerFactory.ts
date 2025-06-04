import pino from 'pino';
import yaml from 'js-yaml';
import fs from 'fs';
import {isLocal} from "./env";

// Load YAML configuration
const CONFIG = yaml.load(fs.readFileSync('logging.yaml', 'utf8'));

/**
 * Get the log level for a given logger name. Logger names are hierarchical, so if the named logger does not exist,
 * the parent logger's level is used.
 * @param name - The name of the logger (e.g., 'service.foo').
 */
const getLogLevel = (name: string): string => {
    const parts = name.split('.');
    // @ts-ignore
    let node = CONFIG.root;
    let currentLevel = node.level;
    for (const part of parts) {
        if (!node) break;
        if (typeof node[part] === 'string') {
            currentLevel = node[part];
            break;
        }
        node = node[part];
        if (node?.level) {
            currentLevel = node.level;
        }
    }
    // console.log(`getLogLevel: ${name} -> ${currentLevel}`);
    return currentLevel;
}

const ROOT_LOGGER = pino({
    level: getLogLevel('root'),
    enabled: !process.env.NOLOG,
    ...(isLocal && {
        // serializers: {
        //     err: (err: Error) => `[${err.name}] ${err.message} | ${err.stack?.replace(/\s+/g, ' ')}`
        // },
        transport: {
            target: 'pino-pretty',
            options: {
                messageFormat: '[{module}] {msg}',
                ignore: 'pid,hostname,module',
                singleLine: true,
                colorize: true,
            },
        },
    }),
});

const scrub = (value: any): string => {
    return String(value).replace(/\s+/g, ' ').trim();
};

function errorString(err: Error): string {
    const values = Object.values(err)
        .filter((v) => v != null && v !== '') // exclude null, undefined, and empty
        .map(scrub);
    return `${scrub(err.stack)}|${values.join('|')}`;
}

const getLogger = (name: string) => {
    const baseLogger = ROOT_LOGGER.child({
        module: name,
        level: getLogLevel(name)
    });

    // patch .error so that we have a nice easy way to log a message with a stack trace
    const originalErrorFx = baseLogger.error
    // @ts-expect-error shush up
    baseLogger._error = originalErrorFx
    // @ts-expect-error shush up
    baseLogger.error = (msg: string, err: Error) => {
        try {
            const errorStr = errorString(err)
            msg += ' | ' + errorStr
        }
        catch (e) {
            console.error(e)
        }
        // @ts-expect-error shush up
        baseLogger._error({msg})
    }
    return baseLogger;
}

export {
    getLogger,
    getLogLevel
};
