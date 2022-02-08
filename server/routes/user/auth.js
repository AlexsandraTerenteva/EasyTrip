/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

router
  .route('/login')
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const user = await User.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
          req.session.user = {
            username: user.name,
            email: user.email,
            id: user.id,
          };
          return res.json({
            username: user.name,
            email: user.email,
            id: user.id,
          });
        } else {
          return res.json({
            username: 'Данные введены неверно!',
            email: null,
            id: null,
          });
        }
      }
    } catch (error) {
      return res.status(400).json({ message: 'Пользователь не существует' });
    }
  });

router
  .route('/registrate')
  .post(async (req, res) => {
    const { email, password, username } = req.body;
    try {
      if (email && password && username) {
        const hashPass = await bcrypt.hash(password, 10);
        const user = await User.findOne({ where: { email } });
        if (user) {
          return res.status(400).json({ message: 'Пользователь уже существует' });
        }
        const newUser = await User.create({ name: username, password: hashPass, email });
        if (newUser) {
          req.session.user = {
            username: newUser.name,
            email: newUser.email,
            id: newUser.id,
          };
          return res.json({
            username: newUser.name,
            email: newUser.email,
            id: newUser.id,
          });
        }
        throw Error();
      }
      throw Error();
    } catch (error) {
      return res.status(400).json({ message: 'Пользователь не зарегистрирован' });
    }
  });

router
  .route('/logout')
  .get((req, res) => {
    try {
      req.session.destroy();
      res.cookie('sid', '00', { expires: new Date() });
      res.clearCookie('sid');
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({ message: 'Произошла ошибка' });
    }
  });

router
  .route('/check')
  .get((req, res) => {
    try {
      if (req.session?.user?.id) {
        return res.json(req.session.user);
      }
    } catch (error) {
      return res.status(400).json({ message: 'Произошла ошибка' });
    }
  });

router
  .route('/newpass')
  .post(async (req, res) => {
    try {
      const { oldpass, newpass } = req.body;
      const user = await User.findOne({ where: { id: req.session.user?.id } });
      if (await bcrypt.compare(oldpass, user.password)) {
        const hashPass = await bcrypt.hash(newpass, 10);
        user.password = hashPass;
        user.save();
        return res.json('Пароль успешно сменен!');
      }
      return res.json('Пароль введен неверно!');
    } catch (error) {
      return res.status(400).json({ message: 'Произошла ошибка' });
    }
  });

module.exports = router;
