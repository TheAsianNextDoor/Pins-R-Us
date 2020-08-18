import { initializeDriver } from './driver';
import LotuCollections from './websites/lotuCollections';

const creds = require('../credentials.json');

const lotuCollections = new LotuCollections();

(async () => {
    await initializeDriver();
    await lotuCollections.navTo();
    const lotuPinPage = await lotuCollections.clickTileLinkByName(`"Peyotero" 3D 2 Piece Hat Pin Sets`);
    const lotuCheckout = await lotuPinPage.clickBuyButton();
    await lotuCheckout.expressCheckout(creds.user1);
})().catch((e) => { throw new Error(e); });
