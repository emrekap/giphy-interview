import getConfig from 'next/config';
// normally when using ts, i prefer put a codec to env variables using io-ts, fs-ts libraries. 
// that way we catch missing env variables before run time.

export const config = getConfig().publicRuntimeConfig;


export default config;

