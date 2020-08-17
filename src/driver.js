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


// eslint-disable-next-line import/no-mutable-exports
export let webDriver = {
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
export const setDriver = (driver) => { webDriver = driver; };

export default class Driver {
    /**
     * Creates an instance of the chrome webdriver and sets the private webdriver variable
     * @returns {WebDriver}
     */
    initializeDriver = async () => {
        const newDriver = new Builder().forBrowser('chrome').build();
        await newDriver.manage().window().maximize();
        setDriver(newDriver);
        return newDriver;
    };

    /**
     * Kills the webdriver instance, thus closing chrome
     * @returns
     */
    killDriver = () => this.getDriver().quit();
}
