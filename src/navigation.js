import Driver from './driver';

export const navToURL = (url) => Driver.getDriver().get(url);

export const getCurrentURL = () => Driver.getDriver().getCurrentURL();

