import { click } from '../utilities/actionUtils';

export default class Button {
    constructor(by) {
        this.by = by;
    }

    click = async () => click(this.by);
}
