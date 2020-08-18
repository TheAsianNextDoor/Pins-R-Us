import { navToURL } from '../navigation';
import {
    by,
    addBys,
    textMatchesNormalizedQuotes,

} from '../utilities/byUtils';
import { click } from '../utilities/actionUtils';
import LotuPinPage from './lotuPinPage';

export default class LotuCollections {
    constructor() {
        this.url = 'https://www.lotucreations.com/collections/hat-pins';
        this.collectionBy = by.id('Collection');
    }

    getTileLinkByFromName = (name) => addBys(
        this.collectionBy,
        by.xpath(`.//span[${
            textMatchesNormalizedQuotes(name)
        }]/ancestor-or-self::a[position()=1]`),
    )

    clickTileLinkByName = async (name) => {
        await click(this.getTileLinkByFromName(name));
        return new LotuPinPage();
    }

    navTo = async () => {
        await navToURL(this.url);
        return new LotuCollections();
    }
}
