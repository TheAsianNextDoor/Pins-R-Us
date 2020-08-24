import chalk from 'chalk';
import commander from 'commander';
import moment from 'moment';
import { exit } from 'process';
import {
    executePurchase,
    preCheckOptions,
} from './buyHelperFunctions';
import { initializeDriver } from './driver';
import {
    scheduleAsyncFunction,
    executeAsyncFunction,
} from './utilities/scheduleUtils';
import { config } from './config';

commander
    .description('Purchase an item from a website at a given date and time in the future')
    .requiredOption(
        '-w, --website <website>',
        'The website to execute the purchase on',
    )
    .requiredOption(
        '-u, --user <user>',
        'Users to purchase item with',
    )
    .option(
        '-dt, --date-time <dateTime>',
        'The date and time to start running the script',
    )
    .option(
        '-n, --now',
        'If true executes buy immediately',
    )
    .parse(process.argv);


preCheckOptions(commander.opts());

// parse into moment and then convert into JS Date Object for scheduleAsyncFunction
const parsedDateTime = moment(commander.dateTime).toDate();
const { user } = commander;

// Message to warn user to double check values
console.log(`ENSURE OPTIONS ARE CORRECT:\n\n${JSON.stringify(commander.opts(), null, 4)}`);
console.log(`\nIf they are not correct, kill script with command: ${chalk.cyan('ctrl + c')}`);


(async () => {
    await initializeDriver();

    if (commander.dateTime) {
        await scheduleAsyncFunction(
            async () => executePurchase[commander.website](config[user]),
            parsedDateTime,
        );
        exit(0);
    } else if (commander.now) {
        await executeAsyncFunction(async () => executePurchase[commander.website](config[user]));
    }
})();
