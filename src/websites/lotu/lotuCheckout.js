import Button from '../../controls/button';
import Input from '../../controls/input';
import Select from '../../controls/select';
import { by } from '../../utilities/byUtils';
import LotuShipping from './lotuShipping';

export default class LotuCheckout {
    constructor() {
        const checkoutPrefix = 'checkout_shipping_address_';
        this.emailBy = by.id('checkout_email');
        this.firstNameBy = by.id(`${checkoutPrefix}first_name`);
        this.lastNameBy = by.id(`${checkoutPrefix}last_name`);
        this.addressBy = by.id(`${checkoutPrefix}address1`);
        this.cityBy = by.id(`${checkoutPrefix}city`);
        this.stateBy = by.id(`${checkoutPrefix}province`);
        this.zipBy = by.id(`${checkoutPrefix}zip`);
        this.continueToShippingBy = by.xpath(`//span[text()='Continue to shipping']`);

        // Controls
        this.email = new Input(this.emailBy);
        this.firstName = new Input(this.firstNameBy);
        this.lastName = new Input(this.lastNameBy);
        this.address = new Input(this.addressBy);
        this.city = new Input(this.cityBy);
        this.state = new Select(this.stateBy);
        this.zip = new Input(this.zipBy);
        this.continueToShippingButton = new Button(this.continueToShippingBy);
    }

    expressCheckout = async ({
        email,
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
    }) => {
        await this.email.sendKeys(email);
        await this.firstName.sendKeys(firstName);
        await this.lastName.sendKeys(lastName);
        await this.address.sendKeys(address);
        await this.city.sendKeys(city);
        await this.state.setValue(state);
        await this.zip.sendKeysAndTabOff(zip);
        await this.continueToShippingButton.click();
        return new LotuShipping();
    }
}
