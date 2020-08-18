// eslint-disable-next-line no-unused-vars
import Locator, {
    until,
    // eslint-disable-next-line no-unused-vars
    WebElement,
} from 'selenium-webdriver';
import { getDriver } from '../driver';

export const elementNotFound = {
    toString: () => 'ElementNotFound',
};

export const wait = async (millisToWait) => new Promise((resolve) => { setTimeout(resolve, millisToWait); });

/**
 * Waits until a WebElement is located or the maximum time has elapsed
 *
 * @param {Locator} by
 * @param {boolean} [throwError]
 * @returns {Promise<WebElement>| Error | Promise<elementNotFound>}
 */
export const waitUntilElementLocated = async (
    by,
    throwError = true,
) => {
    const driver = getDriver();
    try {
        return driver.wait(
            until.elementLocated(by),
            10000,
            `Unable to locate WebElement using: ${by}`,
        );
    } catch (e) {
        if (throwError) {
            throw new Error(e);
        }
        console.log(`NOT THROWING when unable to find WebElement using locator: ${by}`);
        return elementNotFound;
    }
};
