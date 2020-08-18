import {
    by,
    concatXpathBysWithOr,
} from '../utilities/byUtils';
import Button from '../controls/button';

export default class LotuPinPage {
    constructor() {
        this.buyItNowBy = by.xpath(`//button[text()='Buy it now']`);
        this.moreOptionsBy = by.xpath(`//button[contains(text(),'More payment options')]`);
        // eslint-disable-next-line max-len
        this.buyButtonBy = by.xpath(`//button[text()='Buy it now'] | //button[contains(text(),'More payment options')]`);

        this.buyButton = new Button(this.buyButtonBy);
    }
}
