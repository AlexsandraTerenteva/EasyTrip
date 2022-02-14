const router = require('express').Router();
const { Op } = require('sequelize');
const { City } = require('../../db/models');
require('dotenv').config();

router.route('/').get(async (req, res) => {
  const town = req.query.city;
  const cities = await City.findAll({
    where: { name: { [Op.startsWith]: town } },
    limit: 5,
  });
  res.json(cities);
});

module.exports = router;
