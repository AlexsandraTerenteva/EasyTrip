const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Ticket.init({
    airline: DataTypes.STRING,
    airlineName: DataTypes.STRING,
    departure_at: DataTypes.STRING,
    destination: DataTypes.STRING,
    destinationCity: DataTypes.STRING,
    destination_airport: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    flight_number: DataTypes.STRING,
    link: DataTypes.STRING,
    origin: DataTypes.STRING,
    originCity: DataTypes.STRING,
    origin_airport: DataTypes.STRING,
    price: DataTypes.INTEGER,
    return_at: DataTypes.STRING,
    return_transfers: DataTypes.INTEGER,
    transfers: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};
