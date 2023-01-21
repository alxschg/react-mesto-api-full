import PopupWithForm from "./PopupWithForm";
import {useState, useContext, useEffect} from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }
  

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText={isLoading? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_type_name"
          placeholder="Имя"
          name="name"
          id="name-input"
          minLength="2"
          maxLength="40"
          value={name || ''}
          required
          onChange={handleChangeName}
        />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_type_job"
          id="job-input"
          placeholder="Профессия"
          name="job"
          minLength="2"
          maxLength="200"
          value={description || ''}
          required
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error job-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
