// eslint-disable-next-line no-unused-vars
import {
    until,
    // eslint-disable-next-line no-unused-vars
    WebElement,
} from 'selenium-webdriver';
import { getDriver } from '../driver';
import { retryWithElement } from './retryUtils';

export const elementNotFound = {
    toString: () => 'ElementNotFound',
};

/**
 * Waits until a WebElement is visible or the maximum time has elapsed
 *
 * @param {Locator[]} by The WebElement's Locator
 * @param {boolean} [throwError] Whether or not the function should throw
 * @param {number} [timeout] The amount of time to try in ms
 * @returns {Promise<WebElement>| Error | Promise<elementNotFound>}
 */
export const waitUntilElementIsVisible = async ({
    by,
    throwError = true,
    timeout = 20000,
} = {}) => {
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
        if (throwError) {
            throw new Error(e);
        }
        console.log(`NOT THROWING in waitUntilElementIsVisible when using locator: ${by}`);
        return elementNotFound;
    }
};


/**
 * Waits until a WebElement is enabled or the maximum time has elapsed
 *
 * @param {Locator[]} by The WebElement's Locator
 * @param {boolean} [throwError] Whether or not the function should throw
 * @param {number} [timeout] The amount of time to try in ms
 * @returns {Promise<WebElement>| Error | Promise<elementNotFound>}
 */
export const waitUntilElementIsEnabled = async ({
    by,
    throwError = true,
    timeout = 20000,
} = {}) => {
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
        if (throwError) {
            throw new Error(e);
        }
        console.log(`NOT THROWING in waitUntilElementIsEnabled when using locator: ${by}`);
        return elementNotFound;
    }
};
