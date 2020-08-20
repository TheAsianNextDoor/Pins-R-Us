import {
    by,
    containsNormalizedClass,
    containsNormalizedText,
    ancestorAtPosition,
    addBys,
} from '../../utilities/byUtils';
import Input from '../../controls/input';
import Button from '../../controls/button';

export default class LotuPayment {
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

        this.cardIframeBy = by.className('card-fields-iframe');
        this.cardNumberBy = addBys(
            this.cardIframeBy,
            by.id('number'),
        );
        this.cardNameOnBy = addBys(
            this.cardIframeBy,
            by.id('name'),
        );
        this.cardExpirationDateBy = addBys(
            this.cardIframeBy,
            by.id('expiry'),
        );
        this.cardSecurityCodeBy = addBys(
            this.cardIframeBy,
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
        await this.cardNumber.sendKeysOneAtATime(cardNumber);
        await this.cardNameOn.sendKeysOneAtATime(cardNameOn);
        await this.cardExpirationDate.sendKeysOneAtATime(cardExpirationDate);
        await this.cardSecurityCode.sendKeysOneAtATime(cardSecurityCode);
    };
}
