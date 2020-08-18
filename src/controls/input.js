import {
    setText,
    getValue,
    pressTab,
} from '../utilities/actionUtils';
import { basicRetry } from '../utilities/retryUtils';

export default class Input {
    constructor(by) {
        this.by = by;
    }

    getValue = async () => getValue(this.by);

    setValue = async (text) => {
        await basicRetry(async () => {
            await setText(this.by, text);
            const actualText = await this.getValue();
            if (text !== actualText) {
                throw new Error(`Text Box text was not set correctly: ${text} was supposed to be ${actualText}`);
            }
        });
    }

    setValueAndTabOff = async (text) => {
        await basicRetry(async () => {
            await setText(this.by, text);
            const actualText = await this.getValue();
            await pressTab();
            if (text !== actualText) {
                throw new Error(`Text Box text was not set correctly: ${text} was supposed to be ${actualText}`);
            }
        });
    }
}
