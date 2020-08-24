import chalk from 'chalk';

export const STRINGS = {
    DOUBLE_QUOTE: `"`,
    SINGLE_QUOTE: `'`,
};

/**
 * Formats an object into a string with indentation and color
 *
 * @param {Object} obj The object to format
 * @param {string} chalkColor Color to set the text to
 * @returns {String}
 */
export const stringifyObjectWithColor = (
    obj = {},
    chalkColor = 'white',
) => chalk.dim[chalkColor](
    JSON.stringify(
        obj,
        null,
        4,
    ),
);
