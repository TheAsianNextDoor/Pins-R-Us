import {
    click,
    getValue,
    setValue,
} from '../utilities/actionUtils';
import {
    addBys,
    by,
} from '../utilities/byUtils';
import { basicRetry } from '../utilities/retryUtils';

export default class Select {
    constructor(rootBy) {
        this.rootBy = rootBy;
    }

    getOptionByFromText = (optionText) => addBys(
        this.rootBy,
        by.xpath(`.//option[text()='${optionText}']`),
    );

    getValue = async () => getValue(this.rootBy);

    clickSelect = async () => click(this.rootBy);

    clickOption = async (optionText) => {
        const optionBy = this.getOptionByFromText(optionText);
        console.log(`Attempting to click option locator: ${optionBy}`);
        await click(optionBy);
    }

    setValue = async (optionText) => {
        await basicRetry(async () => {
            await setValue(this.rootBy, optionText);
        });
    }
}
