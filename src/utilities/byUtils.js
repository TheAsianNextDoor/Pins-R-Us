import {
    By,
    // eslint-disable-next-line no-unused-vars
    Locator,
} from 'selenium-webdriver';

/**
 * Enumeration for Selenium element locators
 * @param {string} string
 * @returns {Locator[]}
 */
export const by = {
    id: (string) => ([By.id(string)]),
    css: (string) => ([By.css(string)]),
    xpath: (string) => ([By.xpath(string)]),
    name: (string) => ([By.name(string)]),
    className: (string) => ([By.className(string)]),
};
