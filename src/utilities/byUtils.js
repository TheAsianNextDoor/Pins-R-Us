import {
    By,
    // eslint-disable-next-line no-unused-vars
    Locator,
} from 'selenium-webdriver';
import { STRINGS } from './stringUtils';

const SINGLE_REPLACEMENT = `", "${STRINGS.SINGLE_QUOTE}", "`;
const DOUBLE_REPLACEMENT = `", '${STRINGS.DOUBLE_QUOTE}', "`;

/**
 * Creates an xpath subsection for finding an ancestor at a given position
 *
 * @param {string} nodeType The node type to search for
 * @param {number} position The node position starting at index 1 from root to top of dom
 * @returns {string}
 */
export const ancestorAtPosition = (nodeType, position) => `ancestor-or-self::${
    nodeType
}[position()=${
    position.toString()
}]`;

/**
 * Creates an xpath subsection for matching normalized value
 *
 * @param {string} partialText The text to partially match
 * @returns {string}
 */
export const containsNormalizedText = (partialText) =>
    `contains(normalize-space(text()), normalize-space('${partialText}'))`;


/**
 * Creates an xpath subsection for matching normalized text()
 *
 * @param {string} partialText The text to partially match
 * @returns {string}
 */
export const containsNormalizedValue = (partialText) =>
    `contains(normalize-space(@value), normalize-space('${partialText}'))`;

/**
 * Creates an xpath subsection for matching normalized class
 *
 * @param {string} partialText The class to partially match
 * @returns {string}
 */
export const containsNormalizedClass = (partialClass) =>
    `contains(normalize-space(@class), normalize-space('${partialClass}'))`;

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
 * Appends a position key onto the Selenium Locator Object
 * The position value is used to determine which WebElement to grab when
 * parsing the DOM
 * @param {Locator} originalObject The Selenium Locator to append to
 * @param {number} [position = 0] Which WebElement index in the findElements array you wish to set to root
 * @see elementUtils.locateElements()
 * @returns {Object}
 */
const addPositionKey = (
    originalObject,
    position = 0,
) => ({
    ...originalObject,
    position,
});

/**
 * Represents our custom Selector class that wraps Selenium Selectors in an array
 * Also adds a position key to the By Object
 */
export class ByArray extends Array {}

/**
 * Enumeration for Selenium element locators
 * All inputs are of type string
 * Wraps Locator in an array and adds a position key
 * Disclaimer: In the future be wary of Selenium module adding position key and overwriting ours
 * @returns {Locator}
 */
export const by = {
    id: (id, position) => new ByArray(addPositionKey(
        By.id(id),
        position,
    )),
    css: (cssSelector, position) => new ByArray(addPositionKey(
        By.css(cssSelector),
        position,
    )),
    xpath: (xpath, position) => new ByArray(addPositionKey(
        By.xpath(xpath),
        position,
    )),
    name: (name, position) => new ByArray(addPositionKey(
        By.name(name),
        position,
    )),
    className: (className, position) => new ByArray(addPositionKey(
        By.className(className),
        position,
    )),
    linkText: (linkText, position) => new ByArray(addPositionKey(
        By.linkText(linkText),
        position,
    )),
    partialLinkText: (partialLinkText, position) => new ByArray(addPositionKey(
        By.partialLinkText(partialLinkText),
        position,
    )),
};
