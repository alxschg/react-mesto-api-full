const { Card } = require('../models/card');
const { NotFoundError } = require('../errors/NotFoundError');
const { ValidationError } = require('../errors/ValidationError');
const { OwnerError } = require('../errors/OwnerError');

async function createCard(req, res, next) {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const card = await Card.create({ name, link, owner: ownerId });
    res.status(201).send(card);
  } catch (err) {
    next(err);
  }
}

async function getAllCards(req, res, next) {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
}

async function deleteCard(req, res, next) {
  try {
    const { cardId } = req.params;

    const card = await Card.findById(cardId).populate('owner');

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    const ownerId = card.owner.id;
    const userId = req.user._id;

    if (ownerId !== userId) {
      throw new OwnerError('Нельзя удалить чужую карточку');
    }

    await Card.findByIdAndRemove(cardId);

    res.send(card);
  } catch (err) {
    next(err);
  }
}

async function deleteLike(req, res, next) {
  try {
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: userId } }, // убрать _id из массива, если он есть
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Неверные данные'));
      return;
    }
    next(err);
  }
}

async function putLike(req, res, next) {
  try {
    const userId = req.user._id;
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError(`Неверные данные в  ${err.path}`));
      return;
    }
    next(err);
  }
}

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  deleteLike,
  putLike,
};
