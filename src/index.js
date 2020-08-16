import Driver from './driver';
import { navToURL } from './navigation';

const driver = new Driver();

(async () => {
    await driver.initializeDriver();
    await navToURL('https://google.com');
})();
