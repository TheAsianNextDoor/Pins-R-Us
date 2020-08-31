import { exit } from 'process';
import {
    parseISO,
    isBefore,
    isValid,
} from 'date-fns';
import { stringWithColor } from './stringUtils';

const iso8601Format = 'YYYY-MM-DD HH:mm:ss';

/**
 * Determines if the given date is valid or not
 * If not, exits process
 *
 * @param {Date} dateString Date in string format to check
 * @returns {Date}
 */
export const parseDate = (dateString) => {
    if (typeof dateString !== 'string') {
        console.log(`\nWas not passed a string. Was passed: ${dateString}\n`);
        exit(0);
    }
    const parsedDate = parseISO(dateString);
    if (!isValid(parsedDate)) {
        console.log(`${stringWithColor('\nInvalid Date Time.', 'redBright')}\
            \nWas passed ${dateString}\
            \nMust be in format: '${iso8601Format}'\
            \nExample: '2013-02-08 24:00:00'\n`);
        exit(0);
    }
    return parsedDate;
};


/**
 * Checks if the Date is in the future, if it is, return the Date
 * If it is not, return current Date plus 30 seconds
 *
 * @param {Date} dateTime The JS date object to ensure
 * @returns {void}
 */
export const ensureFutureDateTime = (dateTime) => {
    const currentDateTime = new Date();
    if (isBefore(dateTime, currentDateTime)) {
        console.log(`\n${
            stringWithColor('Entered date-time: ', 'redBright')
        }${
            dateTime.toString()
        }\n${
            stringWithColor('was before current date-time: ', 'redBright')
        }${
            currentDateTime.toString()
        }\n${
            stringWithColor('Please run script with valid future date-time', 'redBright')
        }\n`);
        exit(0);
    }
};
