import chalk from 'chalk';
import commander from 'commander';
import moment from 'moment';
import {
    executePurchase,
    preCheck,
} from './buyHelperFunctions';
import { initializeDriver } from './driver';
import { scheduleAsyncFunction } from './utilities/scheduleUtils';

const config = require('./config.json');

commander
    .description('Purchase an item from a website at a given date and time in the future')
    .requiredOption(
        '-w, --website <website>',
        'The website to execute the purchase on',
    )
    .option(
        '-dt, --date-time <dateTime>',
        'The date and time to start running the script',
    )
    .option(
        '-pn, -purchase-number <number>',
        'Number of times to purchase item',
    )
    .option(
        '-n, --now',
        'If true executes buy immediately',
    )
    .parse(process.argv);


preCheck(commander.opts());
const parsedMoment = moment(commander.dateTime);

// Message to warn user to double check values
console.log(`ENSURE OPTIONS ARE CORRECT:\n\n${JSON.stringify(commander.opts(), null, 4)}`);
console.log(`\nIf they are not correct, kill script with command: ${chalk.cyan('ctrl + c')}`);

(async () => {
    await initializeDriver();

    if (commander.dateTime) {
        scheduleAsyncFunction(
            async () => executePurchase[commander.website](config),
            parsedMoment.toDate(),
        );
    } else if (commander.now) {
        await executePurchase[commander.website](config);
    }
})();
