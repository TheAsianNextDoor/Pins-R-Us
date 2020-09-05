import { by } from '../../utilities/byUtils';
import Button from '../../controls/button';
import ShopifyInformation from '../shopify/shopifyInformation';

export default class ArtistryShoppingCart {
    constructor() {
        this.checkoutBy = by.name('checkout');

        // controls
        this.checkoutButton = new Button(this.checkoutBy);
    }

    /**
     * Clicks the Checkout button
     *
     * @returns {Promise<ShopifyInformation>}
     */
    clickCheckout = async () => {
        await this.checkoutButton.click();
        return new ShopifyInformation({ isEmailOrPhone: true });
    };
}
