import { exit } from 'process';
import { scheduleJob } from 'node-schedule';
import sleep from 'sleep-promise';
import { getRetryError } from './retryUtils';
import { stringWithColor } from './stringUtils';
import { killDriver } from '../driver';
import { getBooleanEnvVariable } from '../environmentVariables';

const shouldExitChrome = getBooleanEnvVariable('shouldExitChrome');

/**
 * Executes an asynchronous function in the future
 * Catches any errors and logs them out
 * Exits script when finished
 *
 * @param {Function} func The asynchronous function to execute
 * @param {Date} date The date and time to execute the function
 * @param {boolean} [shouldExit] Whether or not to exit script upon completion
 * @returns {Promise<void>}
 */
export const scheduleAsyncFunction = (
    func,
    date,
    shouldExit = false,
) => scheduleJob(
    date,
    async () => func()
        .catch((e) => {
            const retryError = getRetryError();
            if (retryError) {
                console.log(retryError);
            }
            console.log(`Root error: ${stringWithColor(e, 'red')}`);
        })
        .finally(async () => {
            await sleep(2000);
            if (shouldExitChrome && shouldExit) {
                console.log('Exiting Script\n');
                await killDriver();
                exit(0);
            }
            console.log('\nLeaving Chrome open, press ctrl + c to exit script');
        }),
);

/**
 * Executes an asynchronous function
 * Catches any errors and logs them out
 * Exits script when finished
 *
 * @param {Function} func The asynchronous function to execute
 * @returns {Promise<void>}
 */
export const executeAsyncFunction = async (func) => func()
    .catch((e) => {
        const retryError = getRetryError();
        if (retryError) {
            console.log(retryError);
        }
        console.log(`Root error: ${stringWithColor(e, 'red')}`);
    })
    .finally(async () => {
        await sleep(2000);
        if (shouldExitChrome) {
            console.log('Exiting Script\n');
            await killDriver();
            exit(0);
        }
        console.log('\nLeaving Chrome open, press ctrl + c to exit script');
    });
