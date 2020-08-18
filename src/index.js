import { initializeDriver } from './driver';
import { by } from './utilities/byUtils';
import { click } from './utilities/actionUtils';
import LotuCheckout from './websites/lotuCheckout';
import LotuPinPage from './websites/lotuPinPage';
import LotuCollections from './websites/lotuCollections';

const creds = require('../credentials.json');

const lotuCollections = new LotuCollections();
const lotuPinPage = new LotuPinPage();
const lotuCheckout = new LotuCheckout();

(async () => {
    await initializeDriver();
    await lotuCollections.navTo();
    const xpath = by.xpath("//span[contains(text(), 'Peyotero')]/ancestor-or-self::a[position()=1]");
    await click(xpath);
    await lotuPinPage.buyButton.click();
    await lotuCheckout.expressCheckout(creds.user1);
})();
