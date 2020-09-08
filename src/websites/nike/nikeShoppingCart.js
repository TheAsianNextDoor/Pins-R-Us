import { by } from '../../utilities/byUtils';
import Button from '../../controls/button';
import NikeInformation from '../nikeCheckout/nikeInformation';

export default class NikeShoppingCart {
    constructor() {
        this.shoppingCartBy = by.xpath('//li[contains(@data-qa, "top-nav-cart-link")]/a');
        this.checkOutBy = by.xpath('//aside[@data-automation="cart-summary"]//button[@data-automation="guest-checkout-button"]');
        this.guestCheckOutBy = by.id('qa-guest-checkout');
        this.manualAddressButtonBy = by.xpath('//a[contains(text(), "Enter address manually")]');

        // controls
        this.ShoppingCartButton = new Button(this.shoppingCartBy);
        this.CheckOutButton = new Button(this.checkOutBy);
        this.GuestCheckOutButton = new Button(this.guestCheckOutBy);
        this.ManualAddressButton = new Button(this.manualAddressButtonBy);
    }

    /**
     * Clicks the Shopping Cart button
     *
     * @returns {Promise<NikeInformation>}
     */
    clickShoppingCart = async () => {
        await this.ShoppingCartButton.click();
        return new NikeInformation();
    };

    /**
     * Clicks through the checkout as a guest
     */
    clickCheckout = async () => {
        await this.CheckOutButton.click();
        await this.GuestCheckOutButton.click();
        await this.ManualAddressButton.click();
        return new NikeInformation();
    };
}
