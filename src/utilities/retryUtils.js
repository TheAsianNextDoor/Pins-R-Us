import retry from 'async-retry';
import boxen from 'boxen';
import { locateElement } from './elementUtils';
import { switchToDefaultFrame } from './frameUtils';

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
 * Formats an error stack with boxen
 *
 * @param {Error} error The error to format
 * @param {String} message The message to place in the box
 * @returns {Error}
 */
const formatRetryErrorStack = (error, message) => {
    const formattedError = error;
    formattedError.stack = `\n\n${
        boxen(
            `\n  ${message}  \n`,
            {
                borderStyle: 'double',
            },
        )
    }\n\n${error.stack}\n\n${
        boxen(
            `\n  ${message}  \n`,
            {
                borderStyle: 'double',
            },
        )
    }\n\n`;
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
 * Asynchronously retries a function by locating the WebElement from a Locator and
 * passing it to the function
 * @param {Locator[]} by The Locator to find the WebElement
 * @param {Function} retryFunc The function to retry
 * @param {Function} [onRetryFunc] The function to execute upon each retry
 * @returns {Promise<*>}
 */
export const retryWithElement = async (
    by,
    retryFunc,
    onRetryFunc = () => {},
) => retry(
    async (bail, iteration) => {
        if (
            !(by instanceof Array)
            || by.length < 1
        ) {
            bail(new Error(`Must pass a valid Locator Array to retryWithElement, passed:${by}`));
        }
        await switchToDefaultFrame();
        const element = await locateElement(by);
        return retryFunc(element, bail, iteration);
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
) => retry(
    async (bail, iteration) => retryFunc(bail, iteration),
    retryConfig(onRetryFunc),
).catch((e) => {
    setRetryError(formatRetryErrorStack(e, 'THREW FROM WITHIN basicRetry'));
    throw new Error(`Threw from basicRetry - ${e}`);
});
