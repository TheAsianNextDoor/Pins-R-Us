import {
    // eslint-disable-next-line no-unused-vars
    Locator,
    // eslint-disable-next-line no-unused-vars
    WebElement,
} from 'selenium-webdriver';
import { NoSuchElementError } from 'selenium-webdriver/lib/error';
import { getDriver } from '../driver';
import { switchToFrame } from './frameUtils';

/**
 * Builds an object containing element descriptors:
 * tagName, id, css, and value
 *
 * @param {WebElement} element The WebElement to get the description of
 * @returns {Promise<Object>}
 */
export const getElementDescription = async (element) => ({
    tagName: await element.getTagName(),
    id: await element.getId(),
    css: await element.getCssValue(),
    value: await element.getAttribute('value'),
    text: await element.getText(),
    outerHTML: await element.getAttribute('outerHTML'),
});

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
 * Locates multiple WebElements in the DOM by parsing locatorArray and setting
 * each element as it traverses as the new rootElement
 *
 * @param {Locator[]} locatorArray Array of Locators leading to WebElements
 * @returns {Promise<WebElement[]>}
 */
export const locateElements = async (locatorArray) => {
    // driver starts off as root element
    let rootElement = getDriver();

    // Loop through locator array setting each found WebElement as root
    // And continuing traversal from there
    for (let i = 0; i < locatorArray.length; i += 1) {
        const currentBy = locatorArray[i];
        let currentElement;
        const currentByPosition = currentBy.position;

        try {
            // if position is 0 find first element
            if (currentByPosition === 0) {
                currentElement = await rootElement.findElement(currentBy);
            } else {
                currentElement = (await rootElement.findElements(currentBy))[currentByPosition];
            }
        } catch (e) {
            // handle NoSuchElementError specially
            if (e instanceof NoSuchElementError) {
                throw new Error(`Could not find WebElement using locator array:\n${
                    JSON.stringify(locatorArray, null, 4)
                }`);
            }
            throw new Error(e);
        }

        if (await currentElement.getTagName() === 'iframe') {
            await switchToFrame(currentElement);
            rootElement = getDriver();
        } else if (i === locatorArray.length - 1) { // if last by, always find all paths
            rootElement = await rootElement.findElements(currentBy);
        } else { // if not last by
            rootElement = currentElement;
        }
    }
    return rootElement;
};

/**
 * Locates a single WebElements in the DOM by calling locateElements and
 * returning the first index
 *
 * @param {Locator[]} locatorArray Array of Locators leading to a single WebElement
 * @returns {Promise<WebElement>}
 */
export const locateElement = async (locatorArray) => {
    const elements = await locateElements(locatorArray);
    const result = (elements.length > 0) ? elements[0] : null;
    return result;
};
