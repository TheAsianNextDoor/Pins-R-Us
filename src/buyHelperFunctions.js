import readline from 'readline';
import { exit } from 'process';
import LotuCollections from './websites/lotu/lotuCollections';
import {
    parseMoment,
    ensureFutureMoment,
} from './utilities/dateUtils';
import ArtistryCollections from './websites/artistry/artistryCollections';
import {
    stringWithColor, logStringWithColor,
} from './utilities/stringUtils';

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

/**
 * Ensures that the website is on the supported list
 *
 * @param {string} website The website to buy something from
 */
export const ensureSupportedWebsite = (website) => {
    if (!supportedWebsites.some((site) => site === website)) {
        console.log(`\n'${website}' ${stringWithColor('IS NOT A SUPPORTED WEBSITE', 'redBright')}\
        \nPlease enter one of the following: ${supportedWebsites}\
        \nExiting Script\n`);
        exit(0);
    }
};

export const ensureDateIsCorrect = (passedDate) => {
    const finalQuestion = `Is this date correct? ${
        stringWithColor(passedDate, 'magenta')
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

/**
 * Control flow for Lotu website checkout
 *
 * @param {Object} user Commander user option
 * @returns {void}
 */
const lotuPurchase = async (user) => {
    const lotuCollections = new LotuCollections();
    await lotuCollections.navTo();
    const lotuProduct = await lotuCollections.clickTileLinkByName(user.item);
    const shopifyInfo = await lotuProduct.clickBuyButton();
    const shopifyShipping = await shopifyInfo.expressCheckout(user);
    const shopifyPayment = await shopifyShipping.clickContinueToPayment();
    await shopifyPayment.expressPay(user);
};

/**
 * Control flow for artistry website checkout
 *
 * @param {Object} user Commander user option
 * @returns {void}
 */
const artistryPurchase = async (user) => {
    const artistryCollections = new ArtistryCollections();
    await artistryCollections.navTo();
    const artistryProduct = await artistryCollections.clickTileByName(user.item);
    const artistryShoppingCart = await artistryProduct.clickAddToCart();
    const shopifyInfo = await artistryShoppingCart.clickCheckout();
    const shopifyShipping = await shopifyInfo.expressCheckout(user);
    const shopifyPayment = await shopifyShipping.clickContinueToPayment();
    await shopifyPayment.expressPay(user);
};

/**
 * Control flow for pookster website checkout
 *
 * @param {Object} config Commander config
 * @returns {void}
 */
const pooksterPurchase = async () => {

};

/**
 * Enum for website purchase control flow
 */
export const executePurchase = {
    lotu: async (user) => lotuPurchase(user),
    artistry: async (user) => artistryPurchase(user),
    pookster: async (user) => pooksterPurchase(user),
};

/**
 * Ensures that all commander values are valid
 *
 * @param {Object} options Commander options
 * @returns {void}
 */
export const preCheckOptions = (options) => {
    const {
        dateTime, now, website,
    } = options;

    // if no dateTime or now option passed in
    if (!dateTime && !now) {
        logStringWithColor(
            '\nMust pass in either dateTime or \'now\' flag. Did not pass either',
            'red',
        );
        exit(0);
    }

    // if dateTime and now option passed in
    if (dateTime && now) {
        logStringWithColor(
            '\nMust pass in either dateTime or \'now\' flag. Passed in both',
            'red',
        );
        exit(0);
    }

    // Ensure datTime is in iso 8601 format and in the future if passed
    if (dateTime) {
        const parsedMoment = parseMoment(dateTime);
        ensureFutureMoment(parsedMoment);
    }
    ensureSupportedWebsite(website);
};
