const { Post } = require('../models');

const dummyPosts = [
    {
        id: 1,
        title: "Breaking Bad is the G.O.A.T",
        content: "I dare you to find a better show than this!",
        user_id: 2

    },
    {
        id: 2,
        title: "AI is taking over!",
        content: "Us humans should have a few more years of relevancy.... right?",
        user_id: 1

    },
    {
        id: 3,
        title: "How long does it take to get a job?",
        content: "I've applied to 7 jobs minimum daily for 8 months (over 1600 applications!) and nobody has reached out!",
        user_id: 3

    },
    {
        id: 4,
        title: "Computers are overrated!",
        content: "Bring back the abacus!",
        user_id: 4

    },
    {
        id: 5,
        title: "On a scale of 1 to 10, how much do you hate your current job?",
        content: "And why is it 10?",
        user_id: 5

    }  
]

const post_seeds = () => Post.bulkCreate(dummyPosts);

module.exports = post_seeds;