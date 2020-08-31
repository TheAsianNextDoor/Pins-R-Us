import { click } from '../utilities/actionUtils';
import { waitUntilElementIsEnabled } from '../utilities/waitUntilUtils';

export default class Button {
    constructor(rootBy) {
        this.rootBy = rootBy;
    }

    /**
     * Clicks button
     *
     * @returns {Promise<void>}
     */
    click = async () => {
        await waitUntilElementIsEnabled(this.rootBy);
        await click(this.rootBy);
    };
}
