import {
    by,
    containsNormalizedText,
    ancestorAtPosition,
} from '../../utilities/byUtils';
import Button from '../../controls/button';
import LotuPayment from './lotuPayment';

export default class LotuShipping {
    constructor() {
        this.continueToPaymentBy = by.xpath(`//span[${
            containsNormalizedText('Continue to payment')
        }]/${
            ancestorAtPosition('button', 1)
        }`);

        this.continueToPayment = new Button(this.continueToPaymentBy);
    }

    clickContinueToPayment = async () => {
        await this.continueToPayment.click();
        return new LotuPayment();
    }
}
