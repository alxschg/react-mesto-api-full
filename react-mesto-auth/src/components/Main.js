import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__card">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватарка"
          />
          <button
            className="profile__avatar-button"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="editAdd"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              card={card}
              likes={card.likes.length}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
          ;
        </ul>
      </section>
    </>
  );
}

export default Main;
