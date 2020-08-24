import Button from '../../controls/button';
import { by } from '../../utilities/byUtils';
import ShopifyInformation from '../shopify/shopifyInformation';

export default class LotuProduct {
    constructor() {
        this.buyItNowByString = `//button[text()='Buy it now']`;
        this.moreOptionsByString = `//button[contains(text(),'More payment options')]`;
        this.buyButtonBy = by.xpath(`${this.buyItNowByString} | ${this.moreOptionsByString}`);

        // controls
        this.buyButton = new Button(this.buyButtonBy);
    }

    /**
     * Clicks the Buy button
     *
     * @returns {Promise<void>}
     */
    clickBuyButton = async () => {
        await this.buyButton.click();
        return new ShopifyInformation();
    }
}
