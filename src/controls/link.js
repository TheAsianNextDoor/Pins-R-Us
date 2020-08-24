import {
    getText,
    click,
} from '../utilities/actionUtils';

export default class Link {
    constructor(rootBy) {
        this.rootBy = rootBy;
    }

    /**
     * Retrieves link text
     *
     * @returns {Promise<String>}
     */
    getLinkText = async () => getText(this.rootBy);

    /**
     * Clicks the link
     *
     * @returns {Promise<void>}
     */
    clickLink = async () => click(this.rootBy);
}
