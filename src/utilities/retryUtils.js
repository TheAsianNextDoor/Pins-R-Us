import retry from 'async-retry';
import boxen from 'boxen';
import chalk from 'chalk';
import { getBooleanEnvVariable } from '../environmentVariables';
import {
    getElementDescription,
    locateElement,
} from './elementUtils';
import {
    getInFrame,
    switchToDefaultFrame,
} from './frameUtils';

// environment variables
const shouldTraceLog = getBooleanEnvVariable('shouldTraceLog');
const shouldBasicRetry = getBooleanEnvVariable('shouldBasicRetry');

/**
 * A special variable to track if an error was thrown in retry loops
 * Stack trace is unable to parse properly through anonymous functions
 */
let retryError = null;

/**
 * Retrieves retry Error
 *
 * @returns {Error}
 */
export const getRetryError = () => retryError;

/**
 * Sets the retryError variable to an error
 *
 * @param {Error} error The error to set
 * @returns {void}
 */
const setRetryError = (error) => { retryError = error; };

/**
 * Configuration for boxen
 */
const boxenConfig = {
    borderStyle: 'bold',
    padding: 1,
    margin: 1,
    align: 'center',
    borderColor: 'red',
};

/**
 * Formats an error stack with boxen
 *
 * @param {Error} error The error to format
 * @param {String} message The message to place in the box
 * @returns {Error}
 */
const formatRetryErrorStack = (error, message) => {
    const formattedError = error;
    formattedError.stack = `${
        boxen(
            `${chalk.bold.magenta(message)}`,
            boxenConfig,
        )
    }\n${chalk.red(error.stack)}\n${
        boxen(
            `${chalk.bold.magenta(message)}`,
            boxenConfig,
        )
    }`;
    return formattedError;
};

/**
 * The default retry config
 * @param {Function} onRetryFunc The function to execute upon each retry
 */
const retryConfig = (onRetryFunc) => ({
    retries: 100,
    factor: 1,
    minTimeout: 100,
    maxTimeout: 10000,
    onRetry: (error) => onRetryFunc(error),
});

/**
 * Asynchronously retries a function by locating the WebElement from a locator array and
 * passing it to the function for it to consume
 * @param {Locator[]} by The Locator to find the WebElement
 * @param {Function} retryFunc The function to retry
 * @param {Function} [onRetryFunc] The function to execute upon each retry
 * @returns {Promise<*>}
 */
export const retryWithElement = async ({
    by,
    retryFunc,
    onRetryFunc = () => {},
} = {},
) => retry(
    async (bail, iteration) => {
        if (
            !(by instanceof Array)
            || by.length < 1
        ) {
            bail(new Error(`Must pass a valid Locator Array to retryWithElement, passed:${by}`));
        }
        if (getInFrame()) {
            await switchToDefaultFrame();
        }
        const element = await locateElement(by);
        if (shouldTraceLog) {
            console.log(chalk.dim.yellow(JSON.stringify(
                await getElementDescription(element),
                null,
                4,
            )));
        }
        return retryFunc(
            element,
            bail,
            iteration,
        );
    },
    retryConfig(onRetryFunc),
).catch((e) => {
    setRetryError(formatRetryErrorStack(e, 'THREW FROM WITHIN retryWithElement'));
    throw new Error(`Threw from retryWIthElement - ${e}`);
});

/**
 * Asynchronously retries a given function
 * @param {Function} retryFunc The function to retry
 * @param {Function} [onRetryFunc] The function to execute upon each retry
 * @returns {Promise<*>}
 */
export const basicRetry = async (
    retryFunc,
    onRetryFunc = () => {},
) => {
    if (shouldBasicRetry) {
        return retry(
            async (bail, iteration) => retryFunc(bail, iteration),
            retryConfig(onRetryFunc),
        ).catch((e) => {
            setRetryError(formatRetryErrorStack(e, 'THREW FROM WITHIN basicRetry'));
            throw new Error(`Threw from basicRetry - ${e}`);
        });
    }
    return retryFunc();
};
