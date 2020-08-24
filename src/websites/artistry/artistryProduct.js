import {
    by,
    containsNormalizedText,
    ancestorAtPosition,
} from '../../utilities/byUtils';
import Button from '../../controls/button';
import ArtistryShoppingCart from './artistryShoppingCart';

export default class ArtistryProduct {
    constructor() {
        this.addToCartBy = by.xpath(`//span[${
            containsNormalizedText('Add to Cart')
        }]/${
            ancestorAtPosition('button', 1)
        }`);

        // controls
        this.addToCartButton = new Button(this.addToCartBy);
    }

    /**
     * Clicks the Add to Cart button
     *
     * @returns {Promise<ArtistryShoppingCart>}
     */
    clickAddToCart = async () => {
        await this.addToCartButton.click();
        return new ArtistryShoppingCart();
    };
}
