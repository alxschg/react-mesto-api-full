const { JWT_SECRET, NODE_ENV } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { ConflictError } = require('../errors/ConflictError');
const { ValidationError } = require('../errors/ValidationError');

const SALT_LENGTH = 10;

async function getUser(req, res, next) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Карточка или пользователь не найден или был запрошен несуществующий роут');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля'));
      return;
    }
    next(err);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError('Карточка или пользователь не найден или был запрошен несуществующий роут');
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const {
      email,
      password,
      name,
      about,
      avatar,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, SALT_LENGTH);

    let user = await User.create({
      email,
      password: passwordHash,
      name,
      about,
      avatar,
    });

    user = user.toObject();
    delete user.password;
    res.status(201).send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('При регистрации указан email, который уже существует на сервере'));
      return;
    }
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError('Карточка или пользователь не найден или был запрошен несуществующий роут');
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function updateAvatar(req, res, next) {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError('Карточка или пользователь не найден или был запрошен несуществующий роут');
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user === null) {
        throw new UnauthorizedError('Передан неверный логин или пароль');
      } return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Передан неверный логин или пароль');
          } const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secretkey', { expiresIn: '7d' });
          res.send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
