const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  City.init({
    country_code: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    name_translations: {
      type: DataTypes.STRING,
    },
    time_zone: {
      type: DataTypes.STRING,
    },
    coordinates_lat: {
      type: DataTypes.FLOAT,
    },
    coordinates_lon: {
      type: DataTypes.FLOAT,
    },
  }, {
    sequelize,
    modelName: 'City',
    timestamps: false,
  });
  return City;
};
