import commander from 'commander';
import { parseISO } from 'date-fns';
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
import {
    stringifyObjectWithColor, stringWithColor,
} from './utilities/stringUtils';

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

// parse iso8601 string into Date Object for scheduleAsyncFunction
const parsedDateTime = parseISO(commander.dateTime);
const { user } = commander;

// Message to warn user to double check values
console.log(`ENSURE OPTIONS ARE CORRECT:\n\n${stringifyObjectWithColor(commander.opts())}`);
console.log(`\nIf they are not correct, kill script with command: ${stringWithColor('ctrl + c')}`);

(async () => {
    await initializeDriver();

    if (commander.dateTime) {
        await scheduleAsyncFunction(
            async () => executePurchase[commander.website](config[user]),
            parsedDateTime,
        );
    } else if (commander.now) {
        await executeAsyncFunction(async () => executePurchase[commander.website](config[user]));
    }
})();
