import { getDriver } from '../driver';

/**
 * Navigates to a given url
 * @param {String} url The url to navigate to
 * @returns {void}
 */
export const navToURL = (url) => getDriver().get(url);

/**
 * Returns the current url
 * @returns {String}
 */
export const getCurrentURL = () => getDriver().getCurrentURL();

