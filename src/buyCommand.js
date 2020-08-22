import chalk from 'chalk';
import commander from 'commander';
import { exit } from 'process';
import {
    executePurchase,
    supportedWebsites,
} from './buyHelperFunctions';
import { scheduleAsyncFunction } from './utilities/scheduleUtils';
import { initializeDriver } from './driver';
import { isValidDate } from './utilities/dateUtils';

const config = require('./config.json');

commander
    .description('Purchase an item from a website at a given date and time in the future')
    .requiredOption(
        '-w, --website <website>',
        'The website to execute the purchase on',
    )
    .requiredOption(
        '-dt, --date-time <dateTime>',
        'The date and time to start running the script',
    )
    .option(
        '-n, -purchaseNumber <number>',
        'Number of times to purchase item',
    )
    .parse(process.argv);


const parsedDate = new Date(commander.dateTime);
if (!isValidDate(parsedDate)) {
    console.log('Exiting Script\n');
    exit(0);
}
if (!supportedWebsites.some((site) => site === commander.website)) {
    console.log(`'${commander.website}' IS NOT A SUPPORTED WEBSITE\
    \nPlease enter one of the following: ${supportedWebsites}\
    \nExiting Script\n`);
    exit(0);
}

console.log(`ENSURE OPTIONS ARE CORRECT:\n\n${JSON.stringify(commander.opts(), null, 4)}`);
console.log(`\nIf they are not correct, kill script with command: ${chalk.cyan('ctrl + c')}`);

(async () => {
    await initializeDriver();
    scheduleAsyncFunction(
        async () => executePurchase[commander.website](config),
        commander.dateTime,
    );
})();
