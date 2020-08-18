import {
    By,
    // eslint-disable-next-line no-unused-vars
    Locator,
} from 'selenium-webdriver';

/**
 * Ensures the locator is of type xpath
 * @param {By} locator The locator to check
 */
const ensureIsXpath = (locator) => {
    if (locator.using !== 'xpath') {
        throw new Error(`Locator was not of type xpath: ${locator}`);
    }
};

/**
 * Combines two xpaths by appending the them as such xpath1 + xpath2
 *
 * @param {By} xpathObject1 The base xpath
 * @param {By} xpathObject2 The xpath to append
 * @returns {By}
 */
export const concatXpathBys = (xpathObject1, xpathObject2) => {
    ensureIsXpath(xpathObject1);
    ensureIsXpath(xpathObject2);
    return By.xpath(`${xpathObject1.value}${xpathObject2.value}`);
};

/**
 * Combines two xpaths with an interjected || by appending the them as such xpath1 || xpath2
 *
 * @param {By} xpathObject1 The preceding xpath
 * @param {By} xpathObject2 The trailing xpath
 * @returns {By}
 */
export const concatXpathBysWithOr = (xpathObject1, xpathObject2) => {
    ensureIsXpath(xpathObject1);
    ensureIsXpath(xpathObject2);
    return By.xpath(`${xpathObject1.value} | ${xpathObject2.value}`);
};

export const addBys = (by1, by2) => [
    ...by1,
    ...by2,
];

/**
 * Enumeration for Selenium element locators
 * @param {string} string
 * @returns {Locator}
 */
export const by = {
    id: (string) => [By.id(string)],
    css: (string) => [By.css(string)],
    xpath: (string) => [By.xpath(string)],
    name: (string) => [By.name(string)],
    className: (string) => [By.className(string)],
    linkText: (string) => [By.linkText(string)],
    partialLinkText: (string) => [By.partialLinkText(string)],
};
