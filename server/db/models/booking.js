const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Booking.init({
    content: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    excursion_id: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.STRING,
    },
    members: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    img_url: {
      type: DataTypes.STRING,
    },
    link: {
      type: DataTypes.STRING,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
    },
    activity_type: {
      type: DataTypes.STRING,
    },
    excursion_type: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
