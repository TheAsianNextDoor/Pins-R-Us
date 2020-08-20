import { by } from '../../utilities/byUtils';
import Button from '../../controls/button';
import LotuCheckout from './lotuCheckout';

export default class LotuPinPage {
    constructor() {
        this.buyItNowByString = `//button[text()='Buy it now']`;
        this.moreOptionsByString = `//button[contains(text(),'More payment options')]`;
        this.buyButtonBy = by.xpath(`${this.buyItNowByString} | ${this.moreOptionsByString}`);
        this.buyButton = new Button(this.buyButtonBy);
    }

    clickBuyButton = async () => {
        await this.buyButton.click();
        return new LotuCheckout();
    }
}
