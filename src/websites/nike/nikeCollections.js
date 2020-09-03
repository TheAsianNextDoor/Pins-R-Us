import { navToURL } from '../../utilities/navigationUtils';
import {
    by,
    ancestorAtPosition,
    textContainsNormalizedQuotes,
} from '../../utilities/byUtils';
import NikeProduct from './nikeProduct';
import { refreshPageUntilElementIsLocated } from '../../utilities/waitUntilUtils';
import Button from '../../controls/button';

export default class NikeCollections {
    constructor() {
        this.url = 'https://www.nike.com/launch';
    }
    /**
     * Navigates to the nike SNKRS page
     *
     * @returns {Promise<void>}
     */
    navTo = async () => {
        await navToURL(this.url);
        return new NikeCollections();
    }

    /**
     * Retrieves the Selector Array of a tile given a name
     *
     * @param {String} name The name of the link to retrieve the by of
     * @returns {Promise<By>}
     */
    getTileBy = (name) => by.xpath(`//img[contains(@alt, "${
        name
    }")]/${
        ancestorAtPosition('a', 1)
    }`);

    /**
     * Retrieves a Link Control given a tile name
     *
     * @param {String} name The name of the link to retrieve the by of
     */
    getTileLinkByName = (name) => new Button(this.getTileBy(name));

    /**
     * Clicks a given tile by its name
     *
     * @param {String} name The name of the link to click
     * @returns {Promise<ArtistryProduct>}
     */
    clickTileByName = async (name) => {
        const tileLink = await this.getTileLinkByName(name);
        await tileLink.click();
        return new NikeProduct();
    };

     /**
     * Refresh page until an element is visible
     *
     * @param {String} name the name of the link to locate
     * @returns {Promise<void>}
     */
    refreshPageLocatingTileByName = async (name) => {
        const tileBy = await this.getTileBy(name);
        console.log(tileBy)
        await refreshPageUntilElementIsLocated(tileBy);
    }
}
