import { getDriver } from '../driver';
import { wait } from './waitUtils';

/**
 * Variable for keeping track of whether or not we are in an iFrame
 */
let currentlyInFrame = false;

/**
 * Retrieves the currentlyInFrame variable
 *
 * @returns {boolean}
 */
export const getCurrentlyInFrame = () => currentlyInFrame;

/**
 * Sets the currentlyInFrame variable to either true or false
 *
 * @param {boolean} bool True = in an iFrame, false = root frame
 * @returns {void}
 */
export const setCurrentlyInFrame = (bool) => { currentlyInFrame = bool; };

/**
 * Switches to default frame (most parent frame)
 *
 * @returns {Promise<void>}
 */
export const switchToDefaultFrame = async () => {
    await getDriver().switchTo().defaultContent();
    setCurrentlyInFrame(false);
    await wait(100);
};

/**
 * Switches to a frame given its WebElement
 *
 * @param {WebElement} frameElement
 * @returns {Promise<void>}
 */
export const switchToFrame = async (frameElement) => {
    await getDriver().switchTo().frame(frameElement);
    setCurrentlyInFrame(true);
    await wait(100);
};
