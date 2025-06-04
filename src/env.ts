/**
 * Environment utility.
 */
const getEnv = () => {
    return process.env.ENV
}
const isLocal = getEnv() === 'local';
const isRemote = !isLocal
export {
    getEnv,
    isLocal,
    isRemote
}