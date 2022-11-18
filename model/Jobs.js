const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db")

class Jobs extends Model {}

Jobs.init({
  title: {
    type: DataTypes.STRING,
  },
  logo: {
    type: DataTypes.STRING,
  },
  redirect: {
    type: DataTypes.STRING,
  },
  postdate: {
    type: DataTypes.DATE,
  },
  location: {
    type: DataTypes.STRING,
  },
  company: {
    type: DataTypes.STRING,
  },
  degree: {
    type: DataTypes.STRING
  },
  dopportunities: {
    type: DataTypes.STRING
  },
  fofstd: {
    type: DataTypes.STRING
  },
  duration: {
    type: DataTypes.STRING,
  },
  deadline: {
    type: DataTypes.DATE
  }
}, {
    sequelize,
    modelName: 'jobs',
    timestamps: false
});

module.exports = Jobs;