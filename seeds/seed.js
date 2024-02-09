const sequelize = require('../config/connection');
const { User } = require('../models');
const { Lift } = require('../models');

const userData = require('./userData.json');
const liftData = require('./liftData.json')

const seedDatabase = async () => {
   await sequelize.sync({ force: true });

   await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
   });

   await Lift.bulkCreate(liftData, {
      individualHooks: true,
      returning: true,
   });

   //  for (const lift of liftData) {
   //     await Lift.create({
   //        ...lift,
   //        user_id: users[Math.floor(Math.random() * users.length)].id,
   //     });
   //  }

   process.exit(0);
};

seedDatabase();
