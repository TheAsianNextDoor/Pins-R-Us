import 'chromedriver';
import {
    Builder,
    // eslint-disable-next-line no-unused-vars
    WebDriver,
    // eslint-disable-next-line no-unused-vars
    Locator,
    // eslint-disable-next-line no-unused-vars
    WebElement,
} from 'selenium-webdriver';


/**
 * The private WebDriver instance
 */
let webDriver = {
    message: 'WebDriver has not been initialized yet',
};

/**
 * Returns the instance of the initialized Chrome webDriver
 * @returns {WebDriver}
 */
export const getDriver = () => webDriver;

/**
 * Sets the private webdriver variable
 * @param {WebDriver} driver
 * @returns {void}
 */
export const setDriver = (driver) => {
    if (!(driver instanceof WebDriver)) {
        throw new Error(`driver was not an instance of WebDriver: ${driver}`);
    }
    webDriver = driver;
};

/**
 * Creates an instance of the chrome webdriver and sets the private webdriver variable
 * @returns {WebDriver}
 */
export const initializeDriver = async () => {
    const newDriver = new Builder().forBrowser('chrome').build();
    await newDriver.manage().window().maximize();
    setDriver(newDriver);
    return newDriver;
};

/**
 * Kills the webdriver instance, thus closing chrome
 * @returns
 */
export const killDriver = () => this.getDriver().quit();
