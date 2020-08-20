import { click } from '../utilities/actionUtils';

export default class Button {
    constructor(rootBy) {
        this.rootBy = rootBy;
    }

    /**
     * Clicks button
     * @returns {Promise<void>}
     */
    click = async () => click(this.rootBy);
}
