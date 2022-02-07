exports.isAdmin = (req, res, next) => {
  if (req.session?.user?.admin) next();
  else res.send('не админ');
};

exports.isAuth = (req, res, next) => {
  if (req.session?.user?.name) next();
  else res.send('не авторизован'); // или res.redirect('to login page path')
};

exports.isValid = (req, res, next) => {
  if (req.body.name && req.body.password) next();
  else res.send('не введен пароль или имя');
};

exports.isSameUser = (req, res, next) => {
  if (req.body.name === req.session?.user.name) next();
  else res.send('у вас нет прав');
};
