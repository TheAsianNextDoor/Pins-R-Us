import Button from '../controls/button';
import { pressEnter } from '../utilities/actionUtils';
import { by } from '../utilities/byUtils';
import { wait } from '../utilities/waitUtils';
import Input from '../controls/input';
import Select from '../controls/select';

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
        await this.email.setValue(email);
        await this.firstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.address.setValue(address);
        await this.city.setValue(city);
        await this.state.setValue(state);
        await this.zip.setValueAndTabOff(zip);
        // await wait(2000);
        await this.continueToShippingButton.click();
    }
}
