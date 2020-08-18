import {
    By,
    // eslint-disable-next-line no-unused-vars
    Locator,
} from 'selenium-webdriver';
import { STRINGS } from './stringUtils';

const SINGLE_REPLACEMENT = `", "${STRINGS.SINGLE_QUOTE}", "`;
const DOUBLE_REPLACEMENT = `", '${STRINGS.DOUBLE_QUOTE}', "`;

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

/**
 * Concatenates by1 and by2
 * @param {Locator[]} by1
 * @param {Locator[]} by2
 */
export const addBys = (by1, by2) => by1.concat(by2);


/**
 * Normalizes single and double quotes and preps string to be used in xpath concat function
 * @param str
 * @returns {string}
 */
export const escapeQuotesForXpath = (str) => `"${
    str.split(STRINGS.DOUBLE_QUOTE)
        .map((subStr) => subStr
            .split(STRINGS.SINGLE_QUOTE)
            .join(SINGLE_REPLACEMENT))
        .join(DOUBLE_REPLACEMENT)
}"`;

/**
 * Normalizes single and double quotes
 * Example: By.xpath(`//*[contains(text(), concat("my dog", "'", "s collar"))]`);
 * @param str
 * @returns {string}
 */
export const textContainsNormalizedQuotes = (str) => `contains(text(), concat(${escapeQuotesForXpath(str)}, ''))`;

/**
 * Normalizes single and double quotes for exact text matches
 * Example: By.xpath(`//*[contains(text(), concat("my dog", "'", "s collar"))]`);
 * @param str
 * @returns {string}
 */
export const textMatchesNormalizedQuotes = (str) => `normalize-space(text()) = concat(${
    escapeQuotesForXpath(str)
}, '')`;

/**
 * Enumeration for Selenium element locators
 * All inputs are of type string
 * Wraps Locator in an array to be parsed later
 * @returns {Locator}
 */
export const by = {
    id: (id) => [By.id(id)],
    css: (cssSelector) => [By.css(cssSelector)],
    xpath: (xpath) => [By.xpath(xpath)],
    name: (name) => [By.name(name)],
    className: (className) => [By.className(className)],
    linkText: (linkText) => [By.linkText(linkText)],
    partialLinkText: (partialLinkText) => [By.partialLinkText(partialLinkText)],
};
