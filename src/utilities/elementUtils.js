import {
    // eslint-disable-next-line no-unused-vars
    Locator,
    // eslint-disable-next-line no-unused-vars
    WebElement,
} from 'selenium-webdriver';
import { getDriver } from '../driver';

/**
 *
 * @param {Locator[]} by1
 * @param {Locator[]} by2
 * @returns {Locator[]}
 */
export const addBy = (by1, by2) => ([
    ...by1,
    ...by2,
]);

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
     * Finds HTML elements in dom
     * @param {Locator} locator
     * @returns {WebElement[]}
     */
export const findElements = async (locator) => getDriver().findElements(locator);

/**
     * Finds HTML element in dom
     * @param {Locator} locator
     * @returns {WebElement}
     */
export const findElement = async (locator) => getDriver().findElement(locator);

/**
 * Locates an element in the DOM
 *
 * @param {Locator[]} locatorArray
 * @returns {Promise<WebElement>}
 */
export const locateElement = async (locatorArray) => {
    const root = getDriver();
    let element;
    for (let i = 0; i < locatorArray.length; i += 1) {
        if (i === 0) {
            element = await root.findElement(locatorArray[0]);
        } else {
            element = await element.findElement(locatorArray[i]);
        }
    }
    return element;
};
