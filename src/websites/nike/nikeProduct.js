import {
    by,
    containsNormalizedText,
    ancestorAtPosition,
} from '../../utilities/byUtils';
import Button from '../../controls/button';
import NikeShoppingCart from './nikeShoppingCart';
import { waitUntilElementIsVisible } from'../../utilities/waitUntilUtils';

export default class NikeProduct {
    constructor() {
        this.addToCartBy = by.xpath(`//button[${
            containsNormalizedText('ADD TO CART')
        }]`);

        // controls
        this.addToCartButton = new Button(this.addToCartBy);
    }

    /**
     * Retrieves button for specified size and gender given it's available
     * @param {*} size
     * @param {*} gender 
     */
    pickSizeButton = async (size, gender) => {
        if(gender.toLowerCase() === 'male') {
            const availableCheckerBy = by.xpath(`//button[contains(text(), 'M ${
                size
            } /')]/${
                ancestorAtPosition('li', 1)
            }[@data-qa='size-available']`);

            if(await waitUntilElementIsVisible(availableCheckerBy)){
                return new Button(by.xpath(`//button[contains(text(), 'M ${size} /')]`));
            }
            console.log('Size given for specified shoe was not available');
        }

        const availableCheckerBy = by.xpath(`//button[contains(text(), 'F ${
            size
            } /')]/${
                ancestorAtPosition('li', 1)
            }[@data-qa='size-available']`);

            if(await waitUntilElementIsVisible(availableCheckerBy)){
                return new Button(by.xpath(`//button[contains(text(), 'F ${size} /')]`));
            }
            console.log('Size given for specified shoe was not available');
    }

    clickSize = async () => {
        const sizeButton = await this.pickSizeButton(size, gender);
        await sizeButton.click();
    }

    /**
     * Clicks the Add to Cart button
     *
     * @returns {Promise<NikeShoppingCart>}
     */
    clickAddToCart = async () => {
        await this.addToCartButton.click();
        return new NikeShoppingCart();
    };
}
