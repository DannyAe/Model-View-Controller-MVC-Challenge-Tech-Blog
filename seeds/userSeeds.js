const { User } = require('../models');

const dummyUsers = [
    {
        id: 1,
        username: 'Istanbully',
        password: 'constantinopl3'

    },
    {
        id: 2,
        username: 'MythManLegend',
        password: 'th3l3g3ndhims3lf'
    },
    {
        id: 3,
        username: 'MilesPrower',
        password: '2fast2furious'
    },
    {
        id: 4,
        username: 'lakitusCloud',
        password: 'cameraman3000'
    },
    {
        id: 5,
        username: 'MarstonJohn',
        password: 'cowboyJOHN'
    }
];

const user_seeds = () => User.bulkCreate(dummyUsers);

module.exports = user_seeds;