/**
 * Config Objects for item to purchase, shipping address, and payment info
 */
export const config = {
    userLotu: {
        website: 'lotu',
        items: [
            '"Peyotero" 3D 2 Piece Hat Pin Sets',
            'Psyonica 3D Hat Pins',
        ],
        email: 'blah@gmail.com',
        firstName: 'Donald',
        lastName: 'Trump',
        address: '123 abc street',
        city: 'Honesdale',
        state: 'Pennsylvania',
        zip: '18431',
        cardNumber: '1234123412341234',
        cardNameOn: 'Donald Trump',
        cardExpirationDate: '01 / 01',
        cardSecurityCode: '123',
    },
    userArtistry: {
        website: 'artistry',
        items: [
            'Ocean Man x "Lion Breath"',
            'Ocean Man x "Lion Breath"',
        ],
        email: 'ok@gmail.com',
        firstName: 'Barrack',
        lastName: 'Obama',
        address: '6419 Detroit Avenue',
        city: 'Cleveland',
        state: 'Ohio',
        zip: '44102',
        cardNumber: '1234123412341234',
        cardNameOn: 'Barrack Obama',
        cardExpirationDate: '01 / 01',
        cardSecurityCode: '1234',
    },
};

/**
 * Json schema for config object
 */
export const configJsonSchema = {
    id: '/config',
    title: 'Config',
    description: 'A json schema for the config',
    type: 'object',
    patternProperties: {
        '[\\w\\d]*': {
            type: 'object',
            $ref: '/user',
        },
    },
};

/**
 * Json Schema for user object
 */
export const userJsonSchema = {
    id: '/user',
    title: 'User',
    description: 'Json schema for the user\'s desired website, items, shipping, and payment information',
    type: 'object',
    properties: {
        website: {
            description: 'The website to purchase the item from',
            type: 'string',
            required: true,
        },
        items: {
            description: 'The items to purchase',
            type: 'array',
            required: true,
            minItems: 1,
        },
        email: {
            description: 'The email to purchase the item with',
            type: 'string',
            required: true,
        },
        firstName: {
            description: 'The first name to purchase the item with',
            type: 'string',
            required: true,
        },
        lastName: {
            description: 'The last name to purchase the item with',
            type: 'string',
            required: true,
        },
        address: {
            description: 'The address to send the item to',
            type: 'string',
            required: true,
        },
        city: {
            description: 'The city to send the item to',
            type: 'string',
            required: true,
        },
        state: {
            description: 'The state to send the item to',
            type: 'string',
            required: true,
        },
        zip: {
            description: 'The zip code to send the item to',
            type: 'string',
            required: true,
        },
        cardNumber: {
            description: 'The card number to purchase the item with',
            type: 'string',
            required: true,
        },
        cardNameOn: {
            description: 'The name on the card',
            type: 'string',
            required: true,
        },
        cardExpirationDate: {
            description: 'The expiration date of the card',
            type: 'string',
            required: true,
            pattern: '[0-9][0-9] / [0-9][0-9]',
        },
        cardSecurityCode: {
            description: 'The security code of the card',
            type: 'string',
            required: true,
        },
    },
};
