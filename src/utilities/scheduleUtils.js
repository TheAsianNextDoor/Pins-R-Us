import { exit } from 'process';
import { scheduleJob } from 'node-schedule';
import { getRetryError } from './retryUtils';
import { stringWithColor } from './stringUtils';
import { killDriver } from '../driver';
import { wait } from './waitUtils';

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
            await wait(2000);
            console.log('Exiting Script\n');
            await killDriver();
            if (shouldExit) {
                exit(0);
            }
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
        await wait(2000);
        console.log('Exiting Script\n');
        await killDriver();
        exit(0);
    });
