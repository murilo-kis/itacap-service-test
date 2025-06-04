import app from './app';
import config from './config';
import {shutdownPools} from "./db";
import {getLogger} from "./loggerFactory";
import {getEnv} from "./env";

const log = getLogger('server');

app.listen(config.port, (error?: Error) => {
    if (error) {
        log.error(`Error starting server: ${error}!`);
    } else {
        log.info(`Server running on port:[${config.port}](env=${getEnv()}).`);
    }
});

// // Shutdown Hook
// [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`]
//     .forEach((eventType) => {
//         process.on(eventType, () => {
//
//             // shutdown DB pools
//             shutdownPools()
//
//         });
//     });

