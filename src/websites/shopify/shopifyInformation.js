import Button from '../../controls/button';
import Input from '../../controls/input';
import Select from '../../controls/select';
import { by } from '../../utilities/byUtils';
import ShopifyShipping from './shopifyShipping';

export default class ShopifyInformation {
    constructor(
        { isEmailOrPhone = false } = {},
    ) {
        // var to determine if it is an 'email' field or an 'email or phone' field
        this.isEmailOrPhone = isEmailOrPhone;

        const checkoutPrefix = 'checkout_shipping_address_';
        this.emailBy = by.id('checkout_email');
        this.emailOrPhoneBy = by.id('checkout_email_or_phone');
        this.firstNameBy = by.id(`${checkoutPrefix}first_name`);
        this.lastNameBy = by.id(`${checkoutPrefix}last_name`);
        this.addressBy = by.id(`${checkoutPrefix}address1`);
        this.cityBy = by.id(`${checkoutPrefix}city`);
        this.stateBy = by.id(`${checkoutPrefix}province`);
        this.zipBy = by.id(`${checkoutPrefix}zip`);
        this.continueToShippingBy = by.xpath(`//span[text()='Continue to shipping']`);

        // Controls
        this.email = new Input(this.emailBy);
        this.emailOrPhone = new Input(this.emailOrPhoneBy);
        this.firstName = new Input(this.firstNameBy);
        this.lastName = new Input(this.lastNameBy);
        this.address = new Input(this.addressBy);
        this.city = new Input(this.cityBy);
        this.state = new Select(this.stateBy);
        this.zip = new Input(this.zipBy);
        this.continueToShippingButton = new Button(this.continueToShippingBy);
    }

    /**
     * Enters the given info into the provided fields
     * @param {Object} param0 Config object for filling out page
     *
     * @returns {Promise<ShopifyShipping>}
     */
    expressCheckout = async ({
        email,
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
    }) => {
        if (this.isEmailOrPhone) {
            await this.emailOrPhone.sendKeys(email);
        } else {
            await this.email.sendKeys(email);
        }

        await this.firstName.sendKeysAndTabOff(firstName);
        await this.lastName.sendKeysAndTabOff(lastName);
        await this.address.sendKeysAndTabOff(address);
        await this.city.sendKeysAndTabOff(city);
        await this.state.sendKeysNatively(state);
        await this.zip.sendKeysAndTabOff(zip);
        await this.continueToShippingButton.click();
        return new ShopifyShipping();
    }
}
