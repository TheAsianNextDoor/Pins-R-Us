import {
    // eslint-disable-next-line no-unused-vars
    Locator,
    // eslint-disable-next-line no-unused-vars
    WebElement,
} from 'selenium-webdriver';
import { getDriver } from '../driver';

/**
 * Ensures item in instance of a Selenium WebElement, else throws Error
 * @param {*} item The item to check
 * @returns {WebElement}
 */
export const ensureIsWebElement = (item) => {
    if (item instanceof WebElement) {
        return item;
    }
    throw new Error(`${item} was not an instance of a WebElement`);
};

/**
 * Locates multiple WebElements in the DOM
 *
 * @param {Locator[]} locatorArray
 * @returns {Promise<WebElement>}
 */
export const locateElements = async (locatorArray) => {
    // driver starts off as root
    let root = getDriver();
    for (let i = 0; i < locatorArray.length; i += 1) {
        const currentBy = locatorArray[i];
        if (i === (locatorArray.length - 1)) {
            root = await root.findElements(currentBy);
        } else {
            root = await root.findElement(currentBy);
        }
    }
    return root;
};

/**
 * Locates a single WebElements in the DOM
 *
 * @param {Locator[]} locatorArray
 * @returns {Promise<WebElement>}
 */
export const locateElement = async (locatorArray) => {
    const elements = await locateElements(locatorArray);
    const result = (elements.length > 0) ? elements[0] : null;
    return result;
};
