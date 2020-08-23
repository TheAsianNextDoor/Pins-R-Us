import moment from 'moment';
import { exit } from 'process';
import chalk from 'chalk';

const momentFormat = 'YYYY-MM-DD HH:mm:ss';

/**
 * Determines if the given date is valid or not
 * If not, exits process
 *
 * @param {Date} dateString Date in string format to check
 * @returns {moment.Moment}
 */
export const parseMoment = (dateString) => {
    if (typeof dateString !== 'string') {
        console.log(`\nWas not passed a string. Was passed: ${dateString}\n`);
        exit(0);
    }
    const parsedMoment = moment(dateString);
    if (!(parsedMoment.isValid())) {
        console.log(`${chalk.redBright('\nInvalid Date Time.')}\
            \nWas passed ${dateString}\
            \nMust be in format: '${momentFormat}'\
            \nExample: '2013-02-08 24:00:00'\n`);
        exit(0);
    }
    return parsedMoment;
};


/**
 * Checks if the moment is in the future, if it is, return the moment
 * If it is not, return current moment plus 30 seconds
 *
 * @param {moment} passedMoment The JS date object to ensure
 * @returns {void}
 */
export const ensureFutureMoment = (passedMoment) => {
    const currentMoment = moment();
    if (currentMoment.isAfter(passedMoment)) {
        console.log(`\n${
            chalk.redBright('Entered date-time: ')
        }${
            passedMoment.toString()
        }\n${
            chalk.redBright('was before current date-time: ')
        }${
            currentMoment.toString()
        }\n${
            chalk.redBright('Please run script with valid future date-time')
        }\n`);
        exit(0);
    }
};
