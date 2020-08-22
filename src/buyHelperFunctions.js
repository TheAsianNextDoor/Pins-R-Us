import chalk from 'chalk';
import readline from 'readline';
import { exit } from 'process';
import LotuCollections from './websites/lotu/lotuCollections';

/**
 * List of supported websites
 */
export const supportedWebsites = [
    'lotu',
    'pookster',
    'artistry',
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export const ensureDateIsCorrect = (passedDate) => {
    const finalQuestion = `Is this date correct? ${
        chalk.magenta(passedDate)
    }\nEnter y/yes or n/no\n`;
    console.log(finalQuestion);

    return rl.on('line', (input) => {
        if (input === 'y' || input === 'yes') {
            console.log('Continuing script');
            rl.close();
        } else if (input === 'n' || input === 'no') {
            console.log('Exiting Script\n');
            exit(0);
        } else {
            console.log('Enter a valid input');
        }
    });
};

const lotuPurchase = async (config) => {
    const lotuCollections = new LotuCollections();
    await lotuCollections.navTo();
    const lotuPinPage = await lotuCollections.clickTileLinkByName(config.user1.item);
    const lotuCheckout = await lotuPinPage.clickBuyButton();
    const lotuShipping = await lotuCheckout.expressCheckout(config.user1);
    const lotuPayment = await lotuShipping.clickContinueToPayment();
    await lotuPayment.expressPay(config.user1);
};

const artistryPurchase = async () => {

};

const pooksterPurchase = async () => {

};

export const executePurchase = {
    lotu: async (config) => lotuPurchase(config),
    artistry: async (config) => artistryPurchase(config),
    pookster: async (config) => pooksterPurchase(config),
};
