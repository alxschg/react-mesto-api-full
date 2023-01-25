function InfoTooltipPopup({ message, onClose, isOpen }) {
  return (
    <div
      className={`popup popup_overlay ${isOpen ? `popup_is-opened` : ""}`}
    >
      <div className="auth__tooltip">
        <div
          className={`auth__tooltip-image ${!message ? "auth__tooltip-image_error" : ""}`}
        />
        <p className="auth__tooltip-text">{message ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        

        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltipPopup;
