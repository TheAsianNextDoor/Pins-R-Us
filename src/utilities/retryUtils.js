// import { retry } from '../../node_modules/async-retry/lib/index';
import retry from 'async-retry';
import { findElement } from './elementUtils';

export const retryUntilExhausted = async (
    by,
    retryFunc,
    onRetryFunc = () => {},
) => retry(
    async (bail, iteration) => {
        const element = await findElement(by);
        return retryFunc(element, bail, iteration);
    },
    {
        retries: 500,
        factor: 1,
        minTimeout: 20,
        maxTimeout: 10000,
        onRetry: (error) => onRetryFunc(error),
    },
);
