import {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [imageName, setName] = useState('');
  const [imageLink, setLink] = useState("");

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      imageName,
      imageLink,
    });
  }
  
  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen])

  return (
    <PopupWithForm
      name="create-card"
      title="Новое место"
      buttonText={isLoading? 'Создание...' : 'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="imageName"
        id="imageName"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        className="popup__input popup__input_type_name"
        value={imageName}
        onChange={handleChangeName}
      />
      <span id="imageName-error" className="popup__input-error"></span>

      <input
        name="imageLink"
        id="imageLink"
        type="url"
        placeholder="Ссылка на картинку"
        required
        className="popup__input popup__input_type_job"
        value={imageLink}
        onChange={handleChangeLink}
      />
      <span id="imageLink-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
