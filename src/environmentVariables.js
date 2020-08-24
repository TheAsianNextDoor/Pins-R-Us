import dotenvFlow from 'dotenv-flow';

// reads env files and sets vars
dotenvFlow.config();

/**
 * Returns a string (lowerCase and trimmed) environment variable
 * @param {string} key The key to the Environment variable
 * @returns {string}
 */
export const getStringEnvVariable = (key) => process.env[key].toLowerCase().trim();

/**
 * Returns the environment variable casted to a boolean
 * @param {string} key The key to the Environment variable
 * @returns {boolean}
 */
export const getBooleanEnvVariable = (key) => getStringEnvVariable(key) === 'true';

/**
 * Returns the environment variable casted to an int
 * @param {string} key The key to the Environment variable
 * @returns {int}
 */
export const getIntEnvVariable = (key) => parseInt(getStringEnvVariable(key));
