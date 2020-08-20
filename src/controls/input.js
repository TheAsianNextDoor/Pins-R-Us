import {
    getValue,
    pressTab,
    sendKeys,
    setValue,
    sendKeysOneAtATime,
} from '../utilities/actionUtils';
import { basicRetry } from '../utilities/retryUtils';

export default class Input {
    constructor(rootBy) {
        this.rootBy = rootBy;
    }

    getValue = async () => getValue(this.rootBy);

    sendKeys = async (text) => {
        await basicRetry(async () => {
            await sendKeys(this.rootBy, text);
            const actualText = await this.getValue();
            if (text !== actualText) {
                throw new Error(`Text Box text was not set correctly: ${text} was supposed to be ${actualText}`);
            }
        });
    }

    sendKeysAndTabOff = async (text) => {
        await basicRetry(async () => {
            await sendKeys(this.rootBy, text);
            const actualText = await this.getValue();
            await pressTab();
            if (text !== actualText) {
                throw new Error(`Text Box text was not set correctly: ${text} was supposed to be ${actualText}`);
            }
        });
    }

    sendKeysOneAtATime = async (text) => {
        await basicRetry(async () => {
            await sendKeysOneAtATime(this.rootBy, text);
            const actualText = await this.getValue();
            if (text !== actualText) {
                throw new Error(`Text Box text was not set correctly: ${text} was supposed to be ${actualText}`);
            }
        });
    }

    setValue = async (text) => {
        await basicRetry(async () => {
            await setValue(this.rootBy, text);
            const actualText = await this.getValue();
            if (text !== actualText) {
                throw new Error(`Text Box text was not set correctly: ${text} was supposed to be ${actualText}`);
            }
        });
    }
}
