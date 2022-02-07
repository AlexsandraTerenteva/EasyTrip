module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AirPorts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      city_code: {
        type: Sequelize.STRING,
      },
      country_code: {
        type: Sequelize.STRING,
      },
      name_translations: {
        type: Sequelize.STRING,
      },
      time_zone: {
        type: Sequelize.STRING,
      },
      flightable: {
        type: Sequelize.BOOLEAN,
      },
      coordinates_lat: {
        type: Sequelize.FLOAT,
      },
      coordinates_lon: {
        type: Sequelize.FLOAT,
      },
      code: {
        type: Sequelize.STRING,
      },
      iata_type: {
        type: Sequelize.STRING,
      },

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AirPorts');
  },
};
