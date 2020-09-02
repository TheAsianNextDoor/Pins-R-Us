/**
 * Config Objects for item to purchase, shipping address, and payment info
 */
export const config = {
    // for lotu purchase
    userLotu: {
        items: [
            '"Peyotero" 3D 2 Piece Hat Pin Sets',
            'Psyonica 3D Hat Pins',
            '"Peyotero" 3D 2 Piece Hat Pin Sets',
            '"Peyotero" 3D 2 Piece Hat Pin Sets',
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
    // for artistry purchase
    userArtistry: {
        items: ['Ocean Man x "Lion Breath"'],
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
        cardSecurityCode: '123',
    },
};
