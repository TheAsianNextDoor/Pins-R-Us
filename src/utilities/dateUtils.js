/**
 * Determines if the given date is valid or not
 * @param {Date} date Date to check
 * @returns {boolean}
 */
export const isValidDate = (date) => {
    if (!(date instanceof Date)) {
        throw new Error(`Was not passed a Date object: ${date}`);
    }
    if (!Number.isNaN(date)) {
        console.log(`Invalid Date Time.\
            \nMust be in format: 'Month day, year hour:minute:second'\
            \nExample: 'August 21, 2020 19:39:00'`);
        return false;
    }
    return true;
};
