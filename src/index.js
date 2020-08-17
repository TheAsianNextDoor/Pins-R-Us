import Driver from './driver';
import { navToURL } from './navigation';
import { findElement } from './utilities/elementUtils';
import { by } from './utilities/byUtils';
import { click } from './utilities/actionUtils';
import { waitUntilElementLocated } from './utilities/waitUtils';
import LotuCheckout from './websites/lotuCheckout';

const creds = require('../credentials.json');

const driver = new Driver();
const lotuCheckout = new LotuCheckout();

(async () => {
    await driver.initializeDriver();
    await navToURL('https://www.lotucreations.com/collections/hat-pins');
    const xpath = by.xpath("//span[contains(text(), 'Peyotero')]/ancestor-or-self::a[position()=1]");
    // const element = await locateElement(xpath);
    // const element = await findElement(xpath);
    await click(xpath);
    const xpath2 = by.xpath(`//button[text()='Buy it now']`);
    const element2 = await waitUntilElementLocated(xpath2, false);
    await click(xpath2);
    await lotuCheckout.expressCheckout(creds.user1);
})();
