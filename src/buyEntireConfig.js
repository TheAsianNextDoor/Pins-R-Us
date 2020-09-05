import commander from 'commander';
import { exec } from 'child_process';
import { exit } from 'process';
import { config } from './config';
import { preCheckOptionsForMultiUser } from './buyHelperFunctions';

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
const userArray = configArray.map((entry) => entry[0]);
const optionsToCheck = {
    ...commander.opts(),
    ...{
        websites,
    },
};

preCheckOptionsForMultiUser(optionsToCheck);

for (let i = 0; i < userArray.length; i += 1) {
    const user = userArray[i];
    let parsedCommand = `npm run buyAllItemsForUser -- --user "${user}"`;
    if (dateTime) {
        parsedCommand += ` --date-time "${dateTime}"`;
    }
    if (now) {
        parsedCommand += ` --now`;
    }
    exec(`${parsedCommand}`, (err, stdout, stderr) => {
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
