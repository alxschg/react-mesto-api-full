import {useContext} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, likes, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__delete ${
    !isOwn ? "element__delete_hidden" : ""
  }`;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like_active`;

  function handleClick() {
    onCardClick(card);
    console.log(`currentUs ${currentUser._id}`);
    console.log(`ownerUs ${card.owner._id}`);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <li className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__group-like">
          <button
            type="button"
            className={`element__like ${isLiked && cardLikeButtonClassName}`}
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <span className="element__like-quantity">{likes}</span>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Удалить"
        onClick={handleDeleteClick}
      />
    </li>
  );
}

export default Card;
