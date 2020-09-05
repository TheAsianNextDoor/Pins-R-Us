import commander from 'commander';
import { exec } from 'child_process';
import { exit } from 'process';
import { config } from './config';
import { preCheckOptionsForSingleUser } from './buyHelperFunctions';

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


let parsedCommand = `npm run buyItem -- --website "${website}" --user "${user}"`;
if (dateTime) {
    parsedCommand += ` --date-time "${dateTime}"`;
}
if (now) {
    parsedCommand += ` --now`;
}

for (let i = 0; i < items.length; i += 1) {
    exec(`${parsedCommand} --item ${items[i]}`, (err, stdout, stderr) => {
        console.log(stdout);
        if (err) {
            console.log(err);
        }
        if (stderr) {
            console.log(stderr);
        }
        exit(0);
    });
}
