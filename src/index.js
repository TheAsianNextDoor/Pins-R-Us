import Driver from './driver';
import { navToURL } from './navigation';
import { locateElement } from './utilities/elementUtils';
import { by } from './utilities/byUtils';
import { click } from './utilities/actionUtils';

const driver = new Driver();

(async () => {
    await driver.initializeDriver();
    await navToURL('https://www.lotucreations.com/collections/hat-pins');
    const xpath = by.xpath("//span[contains(text(), 'Peyotero')]/ancestor-or-self::a[position()=1]");
    const element = await locateElement(xpath);
    // const element = await driver.findElement(xpath[0]);
    await click(element);
})();
