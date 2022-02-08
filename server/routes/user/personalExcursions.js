const router = require('express').Router();

const { Booking } = require('../../db/models');

router
  .route('/excursions')
  .get(async (req, res) => {
    const iduser = req.session.user?.id;
    try {
      const personalExcursins = await Booking.findAll({
        where: { user_id: iduser },
      });
      if (personalExcursins) {
        return res.json(personalExcursins);
      }
      throw Error();
    } catch (error) {
      return res.status(400).json({ messsage: 'Нет забронированных экскурсий' });
    }
  });
router
  .route('/excursions/:id')
  .delete(async (req, res) => {
    const iduser = req.session.user?.id;
    try {
      await Booking.destroy({
        where: { id: Number(req.params.id) },
      });
      const allState = await Booking.findAll({ where: { user_id: iduser } });
      return res.json(allState);
    } catch (error) {
      return res.status(400).json({ messsage: 'Нет забронированных экскурсий' });
    }
  });

module.exports = router;
