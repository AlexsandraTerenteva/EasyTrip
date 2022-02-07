const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AirPort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AirPort.init({
    name: {
      type: DataTypes.STRING,
    },
    city_code: {
      type: DataTypes.STRING,
    },
    country_code: {
      type: DataTypes.STRING,
    },
    name_translations: {
      type: DataTypes.STRING,
    },
    time_zone: {
      type: DataTypes.STRING,
    },
    flightable: {
      type: DataTypes.BOOLEAN,
    },
    coordinates_lat: {
      type: DataTypes.FLOAT,
    },
    coordinates_lon: {
      type: DataTypes.FLOAT,
    },
    code: {
      type: DataTypes.STRING,
    },
    iata_type: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'AirPort',
    timestamps: false,

  });
  return AirPort;
};
