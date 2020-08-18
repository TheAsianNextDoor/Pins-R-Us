import { navToURL } from '../navigation';

export default class LotuCollections {
    constructor() {
        this.url = 'https://www.lotucreations.com/collections/hat-pins';
    }

    navTo = async () => navToURL(this.url);
}
