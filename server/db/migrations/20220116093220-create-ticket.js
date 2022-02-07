module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      airline: {
        type: Sequelize.STRING,
      },
      airlineName: {
        type: Sequelize.STRING,
      },
      departure_at: {
        type: Sequelize.STRING,
      },
      destination: {
        type: Sequelize.STRING,
      },
      destinationCity: {
        type: Sequelize.STRING,
      },
      destination_airport: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.INTEGER,
      },
      flight_number: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
      origin: {
        type: Sequelize.STRING,
      },
      originCity: {
        type: Sequelize.STRING,
      },
      origin_airport: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      return_at: {
        type: Sequelize.STRING,
      },
      return_transfers: {
        type: Sequelize.INTEGER,
      },
      transfers: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Tickets');
  },
};
