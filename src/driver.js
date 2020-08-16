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

export default class Driver {
    /**
     * Returns the instance of the initialized Chrome webDriver
     * @returns {WebDriver}
     */
    static getDriver = () => webDriver;

    /**
     * Sets the private webdriver variable
     * @param {WebDriver} driver
     * @returns {void}
     */
    setDriver = (driver) => { webDriver = driver; };

    /**
     * Creates an instance of the chrome webdriver and sets the private webdriver variable
     * @returns {WebDriver}
     */
    initializeDriver = () => {
        const newDriver = new Builder().forBrowser('chrome').build();
        this.setDriver(newDriver);
        return newDriver;
    };

    /**
     * Kills the webdriver instance, thus closing chrome
     * @returns
     */
    killDriver = () => this.getDriver().quit();

    /**
     * Finds HTML element in dom
     * @param {Locator} locator
     * @returns {WebElement}
     */
    findElement = async (locator) => {
        const elementArray = await this.getDriver().findElements(locator);
        return elementArray.length === 1 ? elementArray[0] : elementArray;
    };
}
