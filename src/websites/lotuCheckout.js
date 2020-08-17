import Button from '../controls/button';
import {
    pressEnter,
    setText,
} from '../utilities/actionUtils';
import { by } from '../utilities/byUtils';
import { wait } from '../utilities/waitUtils';


export default class LotuCheckout {
    constructor() {
        const checkoutPrefix = 'checkout_shipping_address_';
        this.emailBy = by.id('checkout_email');
        this.firstNameBy = by.id(`${checkoutPrefix}first_name`);
        this.lastNameBy = by.id(`${checkoutPrefix}last_name`);
        this.addressBy = by.id(`${checkoutPrefix}address1`);
        this.cityBy = by.id(`${checkoutPrefix}city`);
        this.zipBy = by.id(`${checkoutPrefix}zip`);
        this.continueToShippingBy = by.xpath(`//span[text()='Continue to shipping']`);

        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.address = '';
        this.city = '';
        this.zip = '';

        // controls
        this.continueToShippingButton = new Button(this.continueToShippingBy);
    }

    /**
     * Sets the checkout email field to a given text
     * @param {string} email The email to set
     * @returns {Promise<void>}
     */
    setEmail = async (email) => setText(this.emailBy, email);

    /**
     * Sets the checkout first name field to a given text
     * @param {string} firstName The firs name to set
     * @returns {Promise<void>}
     */
    setFirstName = async (firstName) => setText(this.firstNameBy, firstName);

    /**
     * Sets the checkout last name field to a given text
     * @param {string} email The last name to set
     * @returns {Promise<void>}
     */
    setLastName = async (lastName) => setText(this.lastNameBy, lastName);

    /**
     * Sets the checkout address field to a given text
     * @param {string} email The address to set
     * @returns {Promise<void>}
     */
    setAddress = async (address) => setText(this.addressBy, address);

    /**
     * Sets the checkout city field to a given text
     * @param {string} email The city  to set
     * @returns {Promise<void>}
     */
    setCity = async (city) => setText(this.cityBy, city);

    /**
     * Sets the checkout zip field to a given text
     * @param {string} email The zip to set
     * @returns {Promise<void>}
     */
    setZip = async (zip) => setText(this.zipBy, zip);

    expressCheckout = async ({
        email,
        firstName,
        lastName,
        address,
        city,
        zip,
    }) => {
        await this.setEmail(email);
        await this.setFirstName(firstName);
        await this.setLastName(lastName);
        await this.setAddress(address);
        await this.setCity(city);
        await this.setZip(zip);
        await pressEnter();
        await wait(5000);
        await this.continueToShippingButton.click();
    }
}
