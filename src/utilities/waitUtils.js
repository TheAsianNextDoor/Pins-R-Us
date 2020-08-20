/**
 * Halts execution for a given amount of milliseconds and then proceeds
 * @param {number} millisToWait The milliseconds to wait 1000 = 1 second
 */
export const wait = async (millisToWait) => new Promise((resolve) => { setTimeout(resolve, millisToWait); });
