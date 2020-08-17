import {
    // eslint-disable-next-line no-unused-vars
    WebElement,
    // eslint-disable-next-line no-unused-vars
    Actions,
} from 'selenium-webdriver';
import { ensureIsWebElement } from './elementUtils';
import { getDriver } from '../driver';

/**
 * Retrieves the action chain from the Selenium WebDriver
 * Bridge Mode enables Selenium to interact with older web browsers
 * @returns {Actions}
 */
const getActions = () => getDriver().actions({
    bridge: true,
});

/**
 * Clicks a WebElement in the Dom
 * @param {WebElement} webElement The WebElement to click
 * @returns {Promise<void>}
 */
export const click = async (webElement) => {
    const element = ensureIsWebElement(webElement);
    const actions = getActions();
    await actions
        .move({
            x: 0,
            y: 0,
            origin: element,
        })
        .click(element)
        .perform();
};

/**
 * Sends keys to a WebElement in the Dom
 * @param {WebElement} webElement The WebElement to set the text of
 * @param {string} text The text to set
 * @returns {Promise<void>}
 */
export const sendKeys = async (webElement, text) => {
    const element = ensureIsWebElement(webElement);
    const actions = getActions();
    await actions
        .move({
            x: 0,
            y: 0,
            origin: element,
        })
        .sendKeys(text)
        .perform();
};
