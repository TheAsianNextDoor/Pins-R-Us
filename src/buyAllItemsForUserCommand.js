import commander from 'commander';
import { fork } from 'child_process';
import { exit } from 'process';
import { config } from './config';
import {
    preCheckOptionsForSingleUser,
    buildCommanderOptions,
} from './buyHelperFunctions';
import {
    stringifyObjectWithColor,
    stringWithColor,
} from './utilities/stringUtils';

// determines if script is a child process
let isChildProcess = false;
if (process.argv.includes('isChild')) {
    isChildProcess = true;
}

commander
    .description(
        `Spawns a child process that calls the buyItemCommand, \
        for each entry in the "items" key for a specific user's config object`,
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

// commander options
const {
    user,
    dateTime,
    now,
} = commander;

// config values
const {
    items,
    website,
} = config[user];

const optionsToCheck = {
    ...commander.opts(),
    website,
};

preCheckOptionsForSingleUser(optionsToCheck);

const commanderOptions = buildCommanderOptions({
    website,
    user,
    dateTime,
    now,
});


if (!isChildProcess) {
    // Message to warn user to double check values
    console.log(`ENSURE COMMANDER OPTIONS ARE CORRECT:\n${stringifyObjectWithColor(commander.opts())}\n`);
    console.log(`ENSURE CONFIG OBJECT IS CORRECT:\n${stringifyObjectWithColor(config[user])}`);
    console.log(`\nIf they are not correct, kill script with command: ${stringWithColor('ctrl + c')}`);
}


// tracks number of exited child processes
let exitedChildProcesses = 0;

for (let i = 0; i < items.length; i += 1) {
    const forkedProcess = fork(
        `./src/buyItemCommand.js`,
        [
            ...commanderOptions,
            '--item',
            items[i],
        ],
    );

    // eslint-disable-next-line no-loop-func
    forkedProcess.on('exit', () => {
        exitedChildProcesses += 1;
        if (exitedChildProcesses === items.length) {
            exit(0);
        }
    });
}
