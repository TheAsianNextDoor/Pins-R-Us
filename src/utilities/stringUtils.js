import chalk from 'chalk';

export const STRINGS = {
    DOUBLE_QUOTE: `"`,
    SINGLE_QUOTE: `'`,
};

/**
 * Console.logs() a string with color and style, if not given, defaults white and no style

 *
 * @param {String} string The string to log and add color to
 * @param {String} [chalkColor] The color to set the text to
 * @returns {String}
 */
export const logStringWithColor = (
    string,
    chalkColor = 'white',
    style = 'reset',
) => console.log(chalk[style][chalkColor](string));

/**
 * Adds color and style to a string, if not given, defaults white and no style
 *
 * @param {String} string The string to log and add color to
 * @param {String} [chalkColor] The color to set the text to
 * @returns {String}
 */
export const stringWithColor = (
    string,
    chalkColor = 'white',
    style = 'reset',
) => chalk[style][chalkColor](string);

/**
 * Formats an object into a string with indentation and color
 *
 * @param {Object} obj The object to format
 * @param {string} [chalkColor] Color to set the text to
 * @returns {String}
 */
export const stringifyObjectWithColor = (
    obj = {},
    chalkColor = 'white',
    style = 'reset',
) => chalk[style][chalkColor](
    JSON.stringify(
        obj,
        null,
        4,
    ),
);
