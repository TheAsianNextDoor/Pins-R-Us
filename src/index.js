import chalk from 'chalk';
import { initializeDriver } from './driver';
import LotuCollections from './websites/lotu/lotuCollections';
import { getRetryError } from './utilities/retryUtils';

const creds = require('../credentials.json');

const lotuCollections = new LotuCollections();

const executeScript = async () => {
    await initializeDriver();
    await lotuCollections.navTo();
    const lotuPinPage = await lotuCollections.clickTileLinkByName(`"Peyotero" 3D 2 Piece Hat Pin Sets`);
    const lotuCheckout = await lotuPinPage.clickBuyButton();
    const lotuShipping = await lotuCheckout.expressCheckout(creds.user1);
    const lotuPayment = await lotuShipping.clickContinueToPayment();
    await lotuPayment.expressPay(creds.user1);
};

executeScript().catch((e) => {
    const retryError = getRetryError();
    if (retryError) {
        console.log(retryError);
    }
    console.log(`Root error: ${chalk.red(e)}`);
});
