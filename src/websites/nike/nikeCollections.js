import { navToURL } from '../../utilities/navigationUtils';
import { by } from '../../utilities/byUtils';
import NikeProduct from './nikeProduct';
import { refreshPageUntilElementIsLocated } from '../../utilities/waitUntilUtils';
import Link from '../../controls/link';

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
    getTileBy = async (name) => by.xpath(`//a[contains(@aria-label, "${
        name
    }")]`);

    /**
     * Retrieves a Link Control given a tile name
     *
     * @param {String} name The name of the link to retrieve the by of
     */
    getTileLinkByName = async (name) => new Link(await this.getTileBy(name));

    /**
     * Clicks a given tile by its name
     *
     * @param {String} name The name of the link to click
     * @returns {Promise<NikeProduct>}
     */
    clickTileByName = async (name) => {
        const tileLink = await this.getTileLinkByName(name);
        await tileLink.clickLink();
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
        console.log(tileBy);
        await refreshPageUntilElementIsLocated(tileBy);
    }
}
