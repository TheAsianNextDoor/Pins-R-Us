import { exec } from 'child_process';
import commander from 'commander';
import { exit } from 'process';
import { config } from './config';
import { preCheckOptions } from './buyHelperFunctions';

commander
    .description(
        'Spawns a child process that calls the buyCommand, '
        + 'for each entry in the "items" key in the config object',
    )
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

const {
    user,
    website,
    dateTime,
    now,
} = commander;
const { items } = config[user];

let parsedCommand = `npm run buy -- --website "${website}" --user "${user}"`;
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
