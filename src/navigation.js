import { getDriver } from './driver';

export const navToURL = (url) => getDriver().get(url);

export const getCurrentURL = () => getDriver().getCurrentURL();

