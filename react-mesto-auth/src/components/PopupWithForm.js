function PopupWithForm({ name, isOpen, title, onClose, children, buttonText, onSubmit }) {
  return (
    <div id={name} className={`popup ${isOpen ? `popup_is-opened` : ""}`}>
      <div className="popup__form">
        <h2 className="popup__title">{title}</h2>
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <form name={name} className="form" onSubmit={onSubmit}>
          <fieldset className="popup__fieldset">
            {children}
            <button
              type="submit"
              className="popup__button-save"
              aria-label="Создать"
            >
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
