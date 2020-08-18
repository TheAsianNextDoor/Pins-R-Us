import {
    // eslint-disable-next-line no-unused-vars
    WebElement,
    // eslint-disable-next-line no-unused-vars
    Actions,
    Key,
} from 'selenium-webdriver';
import { ensureIsWebElement } from './elementUtils';
import { getDriver } from '../driver';
import { retryWithElement } from './retryUtils';
import { wait } from './waitUtils';


/**
 * Retrieves the action chain from the Selenium WebDriver
 * Bridge Mode enables Selenium to interact with older web browsers
 * @returns {Actions}
 */
const getActions = () => getDriver().actions({
    bridge: true,
});

/**
 * Scrolls the WebElement into view
 * @param {WebElement} webElement
 */
export const scrollIntoViewIfNeeded = async (webElement) => {
    const driver = getDriver();
    await driver.executeScript(
        `
        if (arguments[0].scrollIntoViewIfNeeded instanceof Function){
            arguments[0].scrollIntoViewIfNeeded();
        }
        `,
        webElement,
    );
    await wait(25);
};

/**
 * Clicks a WebElement in the DOM given a locator
 *
 * @param {Locator[]} by The Locator Array that points to the WebElement
 * @returns {Promise<void>}
 */
export const click = async (by) => retryWithElement(
    by,
    async (element) => {
        const el = ensureIsWebElement(element);
        const actions = getActions();
        await scrollIntoViewIfNeeded(el);
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
 * @param {Locator[]} by The Locator Array that points to the WebElement
 * @param {string} text The text to set
 * @returns {Promise<void>}
 */
export const setText = async (
    by,
    text,
) => retryWithElement(
    by,
    async (element) => {
        const el = ensureIsWebElement(element);
        await el.clear();
        await el.sendKeys(text);
    },
);

/**
 * Retrieves the text from a WebElement given a Locator
 *
 * @param {Locator[]} by The Locator Array to find the WebElement
 * @returns {Promise<string>}
 */
export const getText = async (by) => retryWithElement(
    by,
    async (element) => {
        const el = ensureIsWebElement(element);
        return el.getText();
    },
);

export const setValue = async (
    by,
    value,
) => retryWithElement(
    by,
    async (element) => {
        const el = ensureIsWebElement(element);
        const driver = getDriver();
        await driver.executeScript(
            `
            arguments[0].value='arguments[1]';
        `,
            el,
            value,
        );
        await wait(25);
    },
);

/**
 * Retrieves the value attribute from a WebElement given a Locator
 *
 * @param {Locator[]} by The Locator Array to find the WebElement
 * @returns {Promise<string>}
 */
export const getValue = async (by) => retryWithElement(
    by,
    async (element) => {
        const el = ensureIsWebElement(element);
        return el.getAttribute('value');
    },
);

/**
 * Natively presses the ENTER key
 * @returns {Promise<void>}
 */
export const pressEnter = async () => {
    const actions = getActions();
    await actions
        .sendKeys(Key.ENTER)
        .perform();
};

/**
 * Natively presses the TAB key
 * @returns {Promise<void>}
 */
export const pressTab = async () => {
    const actions = getActions();
    await actions
        .sendKeys(Key.TAB)
        .perform();
};
