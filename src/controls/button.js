import { click } from '../utilities/actionUtils';

export default class Button {
    constructor(rootBy) {
        this.rootBy = rootBy;
    }

    click = async () => click(this.rootBy);
}
