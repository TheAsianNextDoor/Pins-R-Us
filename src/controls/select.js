import {
    click,
    getValue,
    sendKeysNatively,
    setValue,
} from '../utilities/actionUtils';
import {
    addBys,
    by,
    containsNormalizedText,
} from '../utilities/byUtils';
import { basicRetry } from '../utilities/retryUtils';
import { wait } from '../utilities/waitUtils';

export default class Select {
    constructor(rootBy) {
        this.rootBy = rootBy;
    }

    getOptionByFromText = (optionText) => addBys(
        this.rootBy,
        by.xpath(`.//option[${containsNormalizedText(optionText)}]`),
    );

    /**
     * Returns value of the select
     * @returns {Promise<String>}
     */
    getValue = async () => getValue(this.rootBy);

    /**
     * Clicks the Select combo box
     * @returns {Promise<void>}
     */
    clickSelect = async () => click(this.rootBy);

    /**
     * Attempts to open select and click option
     *
     * @param {String} optionText The text of the option to click (not value)
     * @returns {Promise<void>}
     */
    clickOption = async (optionText) => {
        await this.clickSelect();
        console.log('Waiting 3 seconds');
        await wait(3000);
        console.log('Done Waiting');
        const optionBy = this.getOptionByFromText(optionText);
        console.log(`Attempting to click option locator: ${optionBy}`);
        await click(optionBy);
    }

    /**
     * Forcefully sets the value of the select
     *
     * @param {String} optionValue The value to forcefully set the select to
     * @returns {Promise<void>}
     */
    setValue = async (optionValue) => {
        await basicRetry(async () => {
            await setValue(this.rootBy, optionValue);
        });
    }

    /**
     * Clicks the input and natively sends the text to the input
     *
     * @param {String} optionText The text to send natively
     * @returns {Promise<void>}
     */
    sendKeysNatively = async (optionText) => {
        await basicRetry(async () => {
            await this.clickSelect();
            await sendKeysNatively(optionText);
        });
    }
}
