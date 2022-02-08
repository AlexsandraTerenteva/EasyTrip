const { renderCities, renderAirLines, renderAirPorts } = require('../../utils/render');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Cities', renderCities(), {});
    await queryInterface.bulkInsert('Airlines', renderAirLines(), {});
    await queryInterface.bulkInsert('AirPorts', renderAirPorts(), {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Cities', null, {});
    await queryInterface.bulkDelete('Airlines', null, {});
    await queryInterface.bulkDelete('AirPorts', null, {});
  },
};
