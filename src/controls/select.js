import { basicRetry } from '../utilities/retryUtils';
import {
    setText,
    getValue,
    click,
} from '../utilities/actionUtils';
import { by } from '../utilities/byUtils';
import { addBy } from '../utilities/elementUtils';

export default class Select {
    constructor(rootBy) {
        this.rootBy = rootBy;
    }

    getOptionByFromText = (optionText) => addBy(
        this.rootBy,
        by.xpath(`.//option[text()='${optionText}']`),
    );

    getValue = async () => getValue(this.rootBy);

    click = async () => click(this.rootBy);

    setValue = async (text) => {
        await basicRetry(async () => {
            await this.click();
            const optionBy = this.getOptionByFromText(text);
            await click(optionBy);
        });
    }
}
