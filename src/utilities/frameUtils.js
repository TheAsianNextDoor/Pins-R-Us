import { getDriver } from '../driver';
import { wait } from './waitUtils';

/**
 * Switches to default frame (most parent frame)
 *
 * @returns {Promise<void>}
 */
export const switchToDefaultFrame = async () => {
    await getDriver().switchTo().defaultContent();
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
    await wait(100);
};
