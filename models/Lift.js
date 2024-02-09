const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Lift extends Model {}

Lift.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      description: {
         type: DataTypes.JSON,
         allowNull: false,
      },
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: "user",
            key: "id",
         },
      },
   },
   {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: "lift",
   }
);

module.exports = Lift;