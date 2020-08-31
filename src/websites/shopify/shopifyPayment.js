import Button from '../../controls/button';
import Input from '../../controls/input';
import {
    addBys,
    ancestorAtPosition,
    by,
    containsNormalizedClass,
    containsNormalizedText,
} from '../../utilities/byUtils';
import { stringWithColor } from '../../utilities/stringUtils';

export default class ShopifyPayment {
    constructor() {
        this.contactBy = by.xpath(`//div[${
            containsNormalizedClass('review-block__content')
        }]/bdo`);
        this.addressBy = by.xpath(`//div[${
            containsNormalizedClass('review-block__content')
        }]/bdo`);
        this.rateBy = by.xpath(`//div[${
            containsNormalizedClass('review-block__content')
        } and @data-review-section = 'shipping-cost']`);

        this.cardNumberBy = addBys(
            by.className('card-fields-iframe', 0),
            by.id('number'),
        );
        this.cardNameOnBy = addBys(
            by.className('card-fields-iframe', 1),
            by.id('name'),
        );
        this.cardExpirationDateBy = addBys(
            by.className('card-fields-iframe', 2),
            by.id('expiry'),
        );
        this.cardSecurityCodeBy = addBys(
            by.className('card-fields-iframe', 3),
            by.id('verification_value'),
        );

        this.payNowButtonBy = by.xpath(`//span[${
            containsNormalizedText('Pay now')
        }]/${
            ancestorAtPosition('button', 1)
        }`);

        // controls
        this.cardNumber = new Input(this.cardNumberBy);
        this.cardNameOn = new Input(this.cardNameOnBy);
        this.cardExpirationDate = new Input(this.cardExpirationDateBy);
        this.cardSecurityCode = new Input(this.cardSecurityCodeBy);
        this.payNowButton = new Button(this.payNowButtonBy);
    }

    /**
     * Enters information into fields: card number, name on card, card expiration, and card security code
     *
     * @param {Object} configObject
     * @returns {Promise<void>}
     */
    expressPay = async ({
        cardNumber,
        cardNameOn,
        cardExpirationDate,
        cardSecurityCode,
    }) => {
        if (
            !cardNumber
            || !cardNameOn
            || !cardExpirationDate
            || !cardSecurityCode
        ) {
            throw new Error(stringWithColor('Must pass in all payment fields, check config.js', 'red'));
        }
        await this.cardNumber.sendKeysOneAtATime(cardNumber);
        await this.cardNameOn.sendKeysOneAtATime(cardNameOn);
        await this.cardExpirationDate.sendKeysOneAtATime(cardExpirationDate);
        await this.cardSecurityCode.sendKeysOneAtATime(cardSecurityCode);
    };
}
