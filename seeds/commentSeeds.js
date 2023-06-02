const { Comment } = require('../models');

const dummyComments = [
    {
        name: "MilesPrower",
        user_id: 3,
        post_id: 4,
        comment_text: "This is the best blog website!"

    },
    {
        name: "MilesPrower",
        user_id: 3,
        post_id: 5,
        comment_text: "Nice the code actually works?!"

    },
    {
        name: "Istanbully",
        user_id: 1,
        post_id: 2,
        comment_text: "Thank you!!"

    },
    {
        name: "lakitusCloud",
        user_id: 4,
        post_id: 5,
        comment_text: "We reached the threshold! Hold on tight!"

    },
    {
        name: "MythManLegend",
        user_id: 2,
        post_id: 2,
        comment_text: "Fantastic news!!"

    }
    
]

const comment_seeds = () => Comment.bulkCreate(dummyComments);

module.exports = comment_seeds;