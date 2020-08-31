// eslint-disable-next-line no-unused-vars
import {
    until,
    // eslint-disable-next-line no-unused-vars
    WebElement,
} from 'selenium-webdriver';
import { getDriver } from '../driver';
import {
    retryWithElement, basicRetry,
} from './retryUtils';
import { locateElement } from './elementUtils';
import { wait } from './waitUtils';
import { refreshPage } from './navigationUtils';
// eslint-disable-next-line no-unused-vars
import { ByArray } from './byUtils';
import { stringifyObjectWithColor } from './stringUtils';

export const waitUntilElementNotFound = {
    toString: () => 'waitUntil ElementNotFound',
};

/**
 * Waits until a WebElement is visible or the maximum time has elapsed
 *
 * @param {Locator[]} by The WebElement's Locator
 * @param {boolean} [shouldThrowError] Whether or not the function should throw
 * @param {number} [timeout] The amount of time to try in ms
 * @returns {Promise<WebElement>| Error | Promise<Object>}
 */
export const waitUntilElementIsVisible = async (
    by,
    shouldThrowError = true,
    timeout = 20000,
) => {
    const driver = getDriver();
    try {
        return retryWithElement(
            by,
            async (el) => driver.wait(
                until.elementIsVisible(el),
                timeout,
                `Unable to locate WebElement using locator: ${by}`,
            ),
        );
    } catch (e) {
        if (shouldThrowError) {
            throw new Error(e);
        }
        console.log(`NOT THROWING in waitUntilElementIsVisible when using locator: ${stringifyObjectWithColor(by)}`);
        return waitUntilElementNotFound;
    }
};

/**
 * Waits until a WebElement is enabled or the maximum time has elapsed
 *
 * @param {Locator[]} by The WebElement's Locator
 * @param {boolean} [shouldThrowError] Whether or not the function should throw
 * @param {number} [timeout] The amount of time to try in ms
 * @returns {Promise<WebElement>| Error | Promise<Object>}
 */
export const waitUntilElementIsEnabled = async (
    by,
    shouldThrowError = true,
    timeout = 20000,
) => {
    const driver = getDriver();
    try {
        return retryWithElement(
            by,
            async (el) => driver.wait(
                until.elementIsEnabled(el),
                timeout,
                `WebElement was not enabled in time: ${by}`,
            ),
        );
    } catch (e) {
        if (shouldThrowError) {
            throw new Error(e);
        }
        console.log(`NOT THROWING in waitUntilElementIsEnabled when using locator: ${stringifyObjectWithColor(by)}`);
        return waitUntilElementNotFound;
    }
};

/**
 * Refresh a page until an element is located
 *
 * @param {ByArray} by The ByArray to locate
 * @param {boolean} [shouldThrowError] Whether or not throw if element is not found within time
 * @param {number} [timeout] The amount of time to attempt
 * @returns {Promise<void> | Error | Promise<Object>}
 */
export const refreshPageUntilElementIsLocated = async (
    by,
    shouldThrowError = true,
    timeout = 5000,
) => {
    try {
        return basicRetry(
            async () => {
                const element = await locateElement(by, false);
                if (!element) {
                    await wait(3000);
                    await refreshPage();
                    throw new Error(`Could not refresh page and find element with by ${stringifyObjectWithColor(by)}`);
                }
            },
            {
                retries: 2,
                maxTimeout: timeout,
            },
        );
    } catch (e) {
        if (shouldThrowError) {
            throw new Error(e);
        }
        console.log(`NOT THROWING in refreshUntilElementIsLocated when using locator: ${stringifyObjectWithColor(by)}`);
        return waitUntilElementNotFound;
    }
};
