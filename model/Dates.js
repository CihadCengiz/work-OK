const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");

class Dates extends Model {}

Dates.init(
  {
    postdate: {
      type: DataTypes.DATE,
    }
  },
  {
    sequelize,
    modelName: "jobs",
    timestamps: false,
  }
);

module.exports = Dates;
