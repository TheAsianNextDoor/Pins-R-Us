import {
    // eslint-disable-next-line no-unused-vars
    WebElement,
    // eslint-disable-next-line no-unused-vars
    Actions,
    Key,
} from 'selenium-webdriver';
import { ensureIsWebElement } from './elementUtils';
import { getDriver } from '../driver';
import { retryUntilExhausted } from './retryUtils';


/**
 * Retrieves the action chain from the Selenium WebDriver
 * Bridge Mode enables Selenium to interact with older web browsers
 * @returns {Actions}
 */
const getActions = () => getDriver().actions({
    bridge: true,
});

/**
 * Clicks a WebElement in the DOM given a locator
 *
 * @param {Locator} by The Locator that points to the WebElement
 * @returns {Promise<void>}
 */
export const click = async (by) => retryUntilExhausted(
    by,
    async (element) => {
        const el = ensureIsWebElement(element);
        const actions = getActions();
        await actions
            .move({
                x: 0,
                y: 0,
                origin: el,
            })
            .click(el)
            .perform();
    },
);

/**
 * Sends keys to a WebElement in the DOM given a Locator
 * @param {Locator} by The Locator that points to the WebElement
 * @param {string} text The text to set
 * @returns {Promise<void>}
 */
export const setText = async (
    by,
    text,
) => retryUntilExhausted(
    by,
    async (element) => {
        const el = ensureIsWebElement(element);
        await el.sendKeys(text);
    },
);

export const pressEnter = async () => {
    const actions = getActions();
    await actions
        .sendKeys(Key.ENTER)
        .perform();
};

