import Button from '../../controls/button';
import Input from '../../controls/input';
import {
    addBys,
    ancestorAtPosition,
    by,
    containsNormalizedClass,
    containsNormalizedText,
} from '../../utilities/byUtils';
import { getBooleanEnvVariable } from '../../environmentVariables';

const shouldPurchase = getBooleanEnvVariable('shouldPurchase');

export default class NikePayment {
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
            by.xpath('//iframe[@title = "Credit Card Form"]'),
            by.id('creditCardNumber'),
        );
        this.cardExpirationDateBy = addBys(
            by.xpath('//iframe[@title = "Credit Card Form"]'),
            by.id('expirationDate'),
        );
        this.cardSecurityCodeBy = addBys(
            by.xpath('//iframe[@title = "Credit Card Form"]'),
            by.id('cvNumber'),
        );

        this.payNowButtonBy = by.xpath(`//span[${
            containsNormalizedText('Pay now')
        }]/${
            ancestorAtPosition('button', 1)
        }`);

        // controls
        this.cardNumber = new Input(this.cardNumberBy);
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
        cardExpirationDate,
        cardSecurityCode,
    }) => {
        await this.cardNumber.sendKeysOneAtATime(cardNumber);
        await this.cardExpirationDate.sendKeysOneAtATime(cardExpirationDate);
        await this.cardSecurityCode.sendKeysOneAtATime(cardSecurityCode);
        if (shouldPurchase) {
            await this.payNowButton.click();
        }
    };
}
