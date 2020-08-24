import chalk from 'chalk';
import { exit } from 'process';
import { scheduleJob } from 'node-schedule';
import { getRetryError } from './retryUtils';

/**
 * Executes an asynchronous function in the future
 *
 * @param {Function} func The asynchronous function to execute
 * @param {Date} date The date and time to execute the function
 */
export const scheduleAsyncFunction = (func, date) => scheduleJob(
    date,
    async () => func()
        .catch((e) => {
            const retryError = getRetryError();
            if (retryError) {
                console.log(retryError);
            }
            console.log(`Root error: ${chalk.red(e)}`);
            exit(0);
        })
        .finally(() => {
            console.log('Exiting Script\n');
            exit(0);
        }),
);

export const executeAsyncFunction = async (func) => func()
    .catch((e) => {
        const retryError = getRetryError();
        if (retryError) {
            console.log(retryError);
        }
        console.log(`Root error: ${chalk.red(e)}`);
        exit(0);
    })
    .finally(() => {
        console.log('Exiting Script\n');
        exit(0);
    });
