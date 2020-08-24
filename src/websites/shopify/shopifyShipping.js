import Button from '../../controls/button';
import { by } from '../../utilities/byUtils';
import ShopifyPayment from './shopifyPayment';

export default class ShopifyShipping {
    constructor() {
        this.continueToPaymentBy = by.id('continue_button');

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
        return new ShopifyPayment();
    }
}
