import Button from '../../controls/button';
import {
    ancestorAtPosition,
    by,
    containsNormalizedText,
} from '../../utilities/byUtils';
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
