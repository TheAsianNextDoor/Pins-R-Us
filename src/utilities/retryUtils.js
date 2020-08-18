import retry from 'async-retry';
import { locateElement } from './elementUtils';

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
 * @param {Locator} by The Locator to find the WebElement
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
        const element = await locateElement(by);
        return retryFunc(element, bail, iteration);
    },
    retryConfig(onRetryFunc),
).catch((e) => console.log(`Threw from basic retry - ${e}`));

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
).catch((e) => console.log(`Threw from basic retry - ${e}`));
