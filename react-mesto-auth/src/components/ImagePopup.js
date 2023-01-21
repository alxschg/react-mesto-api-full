function ImagePopup({ card, onClose }) {
  return (
    <div
      id="image-card"
      className={`popup popup_overlay ${card ? `popup_is-opened` : ""}`}
    >
      <div className="popup__image-container">
        <figure className="popup__image-box">
          <img className="popup__image" src={card?.link} alt={card?.name} />
          <figcaption className="popup__image-text">{card?.name}</figcaption>
        </figure>
        <button
          type="button"
          className="popup__close  popup__close_image"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
