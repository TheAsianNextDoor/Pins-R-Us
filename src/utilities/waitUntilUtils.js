// eslint-disable-next-line no-unused-vars
import Locator, {
    until,
    // eslint-disable-next-line no-unused-vars
    WebElement,
} from 'selenium-webdriver';
import { getDriver } from '../driver';
import { locateElement } from './elementUtils';

export const elementNotFound = {
    toString: () => 'ElementNotFound',
};

/**
 * Waits until a WebElement is visible or the maximum time has elapsed
 *
 * @param {Locator[]} by The WebElement's Locator
 * @param {boolean} [throwError] Whether or not the function should throw
 * @returns {Promise<WebElement>| Error | Promise<elementNotFound>}
 */
export const waitUntilElementIsVisible = async (
    by,
    throwError = true,
) => {
    const driver = getDriver();
    try {
        const el = await locateElement(by);
        return driver.wait(
            until.elementIsVisible(el),
            10000,
            `Unable to locate WebElement using locator: ${by}`,
        );
    } catch (e) {
        if (throwError) {
            throw new Error(e);
        }
        console.log(`NOT THROWING when unable to find WebElement using locator: ${by}`);
        return elementNotFound;
    }
};
