const Lift = require("./Lift");
const User = require("./User");

// Create the associations
User.hasMany(Lift, {
   foreignKey: "user_id",
});

Lift.belongsTo(User, {
   foreignKey: "user_id",
});

module.exports = { User, Lift };
