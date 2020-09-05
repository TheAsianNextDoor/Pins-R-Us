import commander from 'commander';
import { fork } from 'child_process';
import { exit } from 'process';
import { config } from './config';
import {
    preCheckOptionsForMultiUser,
    buildCommanderOptions,
} from './buyHelperFunctions';
import {
    stringifyObjectWithColor,
    stringWithColor,
} from './utilities/stringUtils';

commander
    .description(
        `Spawns child processes that calls buyAllItemsForUser for every user in the config file`,
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
    dateTime,
    now,
} = commander;

const configArray = Object.entries(config);

const websites = configArray.map((entry) => entry[1].website);
const users = configArray.map((entry) => entry[0]);
const optionsToCheck = {
    ...commander.opts(),
    ...{ websites },
};

preCheckOptionsForMultiUser(optionsToCheck);


// Message to warn user to double check values
console.log(`ENSURE COMMANDER OPTIONS ARE CORRECT:\n${stringifyObjectWithColor(commander.opts())}\n`);
console.log(`ENSURE CONFIG OBJECT IS CORRECT:\n${stringifyObjectWithColor(config)}`);
console.log(`\nIf they are not correct, kill script with command: ${stringWithColor('ctrl + c')}`);

// tracks number of exited child processes
let exitedChildProcesses = 0;

for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    const commanderOptions = buildCommanderOptions({
        user,
        dateTime,
        now,
    });

    const forkedProcess = fork(
        `./src/buyAllItemsForUserCommand.js`,
        [
            ...commanderOptions,
            'isChild',
        ],
    );

    // eslint-disable-next-line no-loop-func
    forkedProcess.on('exit', () => {
        exitedChildProcesses += 1;
        if (exitedChildProcesses === users.length) {
            exit(0);
        }
    });
}
