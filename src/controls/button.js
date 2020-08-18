import { click } from '../utilities/actionUtils';

export default class Button {
    constructor(rootBy) {
        this.by = rootBy;
    }

    click = async () => click(this.by);
}
