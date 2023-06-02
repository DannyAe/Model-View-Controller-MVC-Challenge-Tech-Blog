const user_seeds = require('./userSeeds');
const post_seeds = require('./postSeeds');
const comment_seeds = require('./commentSeeds');

const sequelize = require('../config/connection');

const seedData = async () => {
  await sequelize.sync({ force: true });
   
  await user_seeds();

  await post_seeds();

  await comment_seeds();

  process.exit(0);
};

seedData();