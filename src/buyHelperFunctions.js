import chalk from 'chalk';
import readline from 'readline';
import { exit } from 'process';
import LotuCollections from './websites/lotu/lotuCollections';
import {
    parseMoment,
    ensureFutureMoment,
} from './utilities/dateUtils';

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
        console.log(`\n'${website}' ${chalk.redBright('IS NOT A SUPPORTED WEBSITE')}\
        \nPlease enter one of the following: ${supportedWebsites}\
        \nExiting Script\n`);
        exit(0);
    }
};

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

/**
 * Control flow for Lotu website checkout
 *
 * @param {Object} config Commander config
 * @returns {void}
 */
const lotuPurchase = async (config) => {
    const lotuCollections = new LotuCollections();
    await lotuCollections.navTo();
    const lotuPinPage = await lotuCollections.clickTileLinkByName(config.user1.item);
    const lotuCheckout = await lotuPinPage.clickBuyButton();
    const lotuShipping = await lotuCheckout.expressCheckout(config.user1);
    const lotuPayment = await lotuShipping.clickContinueToPayment();
    await lotuPayment.expressPay(config.user1);
};

/**
 * Control flow for artistry website checkout
 *
 * @param {Object} config Commander config
 * @returns {void}
 */
const artistryPurchase = async () => {

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
    lotu: async (config) => lotuPurchase(config),
    artistry: async (config) => artistryPurchase(config),
    pookster: async (config) => pooksterPurchase(config),
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
        console.log(`${chalk.redBright('\nMust pass in either dateTime or \'now\' flag. Did not pass either')}\n`);
        exit(0);
    }

    // if dateTime and now option passed in
    if (dateTime && now) {
        console.log(`${chalk.redBright('\nMust pass in either dateTime or \'now\' flag. Passed in both')}\n`);
        exit(0);
    }

    // Ensure datTime is in iso 8601 format and in the future if passed
    if (dateTime) {
        const parsedMoment = parseMoment(dateTime);
        ensureFutureMoment(parsedMoment);
    }
    ensureSupportedWebsite(website);
};
