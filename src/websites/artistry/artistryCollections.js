import { navToURL } from '../../utilities/navigationUtils';
import {
    by,
    ancestorAtPosition,
    textContainsNormalizedQuotes,
} from '../../utilities/byUtils';
import ArtistryProduct from './artistryProduct';
import Link from '../../controls/link';
import { refreshPageUntilElementIsLocated } from '../../utilities/waitUntilUtils';

export default class ArtistryCollections {
    /**
     * Navigates to the artistry collections page
     *
     * @returns {Promise<void>}
     */
    navTo = async () => navToURL('https://theartistrycollection.com/collections/2018');

    /**
     * Retrieves the Selector Array of a tile given a name
     *
     * @param {String} name The name of the link to retrieve the by of
     * @returns {Promise<By>}
     */
    getTileBy = (name) => by.xpath(`//p[${
        textContainsNormalizedQuotes(name)
    }]/${
        ancestorAtPosition('a', 1)
    }`);

    /**
     * Retrieves a Link Control given a tile name
     *
     * @param {String} name The name of the link to retrieve the by of
     */
    getTileLinkByName = (name) => new Link(this.getTileBy(name));

    /**
     * Clicks a given tile by its name
     *
     * @param {String} name The name of the link to click
     * @returns {Promise<ArtistryProduct>}
     */
    clickTileByName = async (name) => {
        const tileLink = this.getTileLinkByName(name);
        await tileLink.clickLink();
        return new ArtistryProduct();
    };

    refreshPageLocatingTileByName = async (name) => {
        const tileBy = this.getTileBy(name);
        await refreshPageUntilElementIsLocated(tileBy);
    };
}
