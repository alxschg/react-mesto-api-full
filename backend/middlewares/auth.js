const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (header) => header.replace('Bearer ', '');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Ошибка авторизации');
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secretkey');
  } catch (err) {
    throw UnauthorizedError('Ошибка авторизации');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
}

module.exports = { auth };
