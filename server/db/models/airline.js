const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Airline extends Model {
    static associate(models) {
      // define association here
    }
  }
  Airline.init({
    name: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    name_translations: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Airline',
    timestamps: false,
  });
  return Airline;
};
