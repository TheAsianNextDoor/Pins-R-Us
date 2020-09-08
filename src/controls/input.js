import {
    getText,
    getValue,
    pressTab,
    sendKeysOneAtATime,
    sendKeysToElement,
    setValue,
} from '../utilities/actionUtils';
import { basicRetry } from '../utilities/retryUtils';
import { normalizeTextWithSpaces } from '../utilities/stringUtils';

export default class Input {
    constructor(rootBy) {
        this.rootBy = rootBy;
    }

    /**
     * Retrieves value attribute from input
     * @returns {Promise<String>}
     */
    getValue = async () => getValue(this.rootBy);

    /**
     * Retrieves visible text from input
     * @returns {Promise<String>}
     */
    getText = async () => getText(this.rootBy);

    /**
     * Sends keys to the input WebElement
     *
     * @param {string} text The text to send
     * @returns {Promise<void>}
     */
    sendKeys = async (text) => {
        await basicRetry(async () => {
            await sendKeysToElement(this.rootBy, text);
            const actualText = await this.getValue();
            if (text !== actualText) {
                throw new Error(`Text Box text was not set correctly: ${text} was supposed to be ${actualText}`);
            }
        });
    }

    /**
     * Sends keys to the input WebElement and then tabs off
     *
     * @param {string} text The text to send
     * @returns {Promise<void>}
     */
    sendKeysAndTabOff = async (text) => {
        await basicRetry(async () => {
            await sendKeysToElement(this.rootBy, text);
            const actualText = await this.getValue();
            await pressTab();
            if (text !== actualText) {
                throw new Error(`Text Box text was not set correctly: ${text} was supposed to be ${actualText}`);
            }
        });
    }

    /**
     * Sends keys to the input one char at a time, waiting in between
     *
     * @param {string} text The string to send
     * @returns {Promise<void>}
     */
    sendKeysOneAtATime = async (text) => {
        await basicRetry(async () => {
            await sendKeysOneAtATime(this.rootBy, text);
            const actualText = await this.getValue();
            if (text !== actualText) {
                throw new Error(`Text Box text was not set correctly: ${text} was supposed to be ${actualText}`);
            }
        });
    }

    /**
     * Sets the value attribute of the input forcefully
     *
     * @param {String} value The string to set
     * @returns {Promise<void>}
     */
    setValue = async (value) => {
        await basicRetry(async () => {
            await setValue(this.rootBy, value);
            const actualText = await this.getValue();
            if (value !== actualText) {
                throw new Error(`Text Box text was not set correctly: ${value} was supposed to be ${actualText}`);
            }
        });
    }

    /**
     * Send keys to the input one char at a time, waiting in between.
     * Normalizes text from textbox for diffing
     * @param {*} text The string to set
     */
    sendKeysOneAtATimeAndValidateNormalized = async (text) => {
        await basicRetry(async () => {
            await sendKeysOneAtATime(this.rootBy, text);
            const actualText = await this.getValue();
            const normalizedText = await normalizeTextWithSpaces(actualText);
            if (text !== normalizedText) {
                throw new Error(`Text Box text was not set correctly: ${text} was supposed to be ${normalizedText}`);
            }
        });
    }
}
