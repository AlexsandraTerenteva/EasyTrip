module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country_code: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      name_translations: {
        type: Sequelize.STRING,
      },
      time_zone: {
        type: Sequelize.STRING,
      },
      coordinates_lat: {
        type: Sequelize.FLOAT,
      },
      coordinates_lon: {
        type: Sequelize.FLOAT,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Cities');
  },
};
