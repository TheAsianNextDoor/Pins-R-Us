import Button from '../../controls/button';
import { by } from '../../utilities/byUtils';
import NikePayment from './nikePayment';

export default class NikeShipping {
    constructor() {
        this.continueToPaymentBy = by.xpath(`//button[contains(text(), "Continue to Payment")]`);

        // controls
        this.continueToPayment = new Button(this.continueToPaymentBy);
    }

    /**
     * Clicks the continue to payment button
     *
     * @returns {Promise<ShopifyPayment>}
     */
    clickContinueToPayment = async () => {
        await this.continueToPayment.click();
        return new NikePayment();
    }
}
