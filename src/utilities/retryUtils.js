import retry from 'async-retry';
import boxen from 'boxen';
import { getBooleanEnvVariable } from '../environmentVariables';
import { locateElement } from './elementUtils';
import {
    getCurrentlyInFrame,
    switchToDefaultFrame,
} from './frameUtils';
import { stringWithColor } from './stringUtils';

// environment variables
const shouldBasicRetry = getBooleanEnvVariable('shouldBasicRetry');

/**
 * A special variable to track if an error was thrown in retry loops
 * Stack trace is unable to parse properly through anonymous functions
 */
let retryError = null;

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
            `${stringWithColor(message, 'magenta', 'bold')}`,
            boxenConfig,
        )
    }\n${stringWithColor(error.stack, 'redBright')}\n${
        boxen(
            `${stringWithColor(message, 'magenta', 'bold')}`,
            boxenConfig,
        )
    }`;
    return formattedError;
};

/**
 * Returns a retry config
 *
 * @param {number} [retries = ] The number of total retries
 * @param {number} [factor = 1] The factor to increase the wait between each retry
 * @param {number} [minTimeout = 100] The first duration of time to wait between each retry in ms
 * @param {number} [maxTimeout = 1000] THe maximum duration to wait in ms
 * @param {Function} onRetryFunc The function to execute upon each
 * @returns {Object}
 */
export const configurableRetryConfig = ({
    retries = 100,
    factor = 1,
    minTimeout = 100,
    maxTimeout = 100,
    onRetryFunc = () => {},
} = {}) => ({
    retries,
    factor,
    minTimeout,
    maxTimeout,
    onRetry: (error) => onRetryFunc(error),
});

/**
 * Asynchronously retries a function by locating the WebElement from a locator array and
 * passing it to the function for it to consume
 * @param {Locator[]} by The Locator to find the WebElement
 * @param {Function} retryFunc The function to retry
 * @param {Object} [retryConfig] The asyncRetry config object
 * @returns {Promise<*>}
 */
export const retryWithElement = async (
    by,
    retryFunc,
    retryConfig,
) => retry(
    async (bail, iteration) => {
        // if in iframe reset to base frame
        if (getCurrentlyInFrame()) {
            await switchToDefaultFrame();
        }
        const element = await locateElement(by);
        return retryFunc(
            element,
            bail,
            iteration,
        );
    },
    configurableRetryConfig(retryConfig),
).catch((e) => {
    setRetryError(formatRetryErrorStack(e, 'THREW FROM WITHIN retryWithElement'));
    throw new Error(`Threw from retryWIthElement - ${e}`);
});

/**
 * Asynchronously retries a given function
 * @param {Function} retryFunc The function to retry
 * @param {Object} [retryConfig] The asyncRetry config object
 * @returns {Promise<*>}
 */
export const basicRetry = async (
    retryFunc,
    retryConfig = () => {},
) => {
    if (shouldBasicRetry) {
        return retry(
            async (bail, iteration) => retryFunc(bail, iteration),
            configurableRetryConfig(retryConfig),
        ).catch((e) => {
            setRetryError(formatRetryErrorStack(e, 'THREW FROM WITHIN basicRetry'));
            throw new Error(`Threw from basicRetry - ${e}`);
        });
    }
    return retryFunc();
};
