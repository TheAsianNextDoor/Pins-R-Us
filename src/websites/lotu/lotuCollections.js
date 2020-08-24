import {
    addBys,
    ancestorAtPosition,
    by,
    textContainsNormalizedQuotes,
} from '../../utilities/byUtils';
import { navToURL } from '../../utilities/navigationUtils';
import LotuProduct from './lotuProduct';
import Link from '../../controls/link';

export default class LotuCollections {
    constructor() {
        this.url = 'https://www.lotucreations.com/collections/hat-pins';
        this.collectionBy = by.id('Collection');
    }

    /**
     * Navigates to the lotu collections page
     *
     * @returns {Promise<void>}
     */
    navTo = async () => {
        await navToURL(this.url);
        return new LotuCollections();
    };

    /**
     * Retrieves the Selector Array of a tile given a name
     *
     * @param {String} name The name of the link to retrieve the by of
     * @returns {Promise<By>}
     */
    getTileLinkByFromName = (name) => addBys(
        this.collectionBy,
        by.xpath(`.//span[${
            textContainsNormalizedQuotes(name)
        }]/${
            ancestorAtPosition('a', 1)
        }`),
    );

    /**
     * Retrieves a Link Control given a tile name
     *
     * @param {String} name The name of the link to retrieve the by of
     */
    getTileLinkFromName = (name) => new Link(this.getTileLinkByFromName(name));

    /**
     * Clicks a given tile by its name
     *
     * @param {String} name The name of the link to click
     * @returns {Promise<LotuProduct>}
     */
    clickTileLinkByName = async (name) => {
        const tileLink = this.getTileLinkFromName(name);
        await tileLink.clickLink();
        return new LotuProduct();
    };
}
