import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltipPopup from "./InfoTooltipPopup.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { register, authorization, validityToken } from "../utils/auth.js";

import ImagePopup from "./ImagePopup.js";

import { useState, useEffect } from "react";
import api from "../utils/Api";

import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header.js";
import Footer from "./Footer.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [email, setEmail] = useState("");
  const history = useNavigate();
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isLogged) {
      api.getUserInfo().then(setCurrentUser).catch(console.error);
      api.getCards().then(setCards).catch(console.error);
    }
  }, [isLogged]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function onRegister(email, password) {
    register(password, email)
      .then((res) => {
        setIsInfoTooltipOpen(true);
        if (res) {
          setMessage(true);
          history("/sign-in");
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function onLogin(email, password) {
    authorization(password, email)
      .then((res) => {
        if (res) {
          setEmail(email);
          setIsLogged(true);
          history("/");
          localStorage.setItem("jwt", res.token);
        }
      })
      .catch(() => {
        setMessage(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    history("/sign-in");
    setIsLogged(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      validityToken(token)
        .then((res) => {
          setEmail(res.data.email);

          setIsLogged(true);
          history("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api
      .editProfil(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function handleAddPlace(place) {
    setIsLoading(true);
    api
      .addNewCard(place)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogout={handleLogout} email={email} />
        <main className="content">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute isLogged={isLogged}>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/sign-up"
              element={<Register onRegister={onRegister} />}
            />

            <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
            <Route
              path="*"
              element={
                isLogged ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
        </main>
        <Footer/>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />

        <PopupWithForm
          name="delete-popup"
          title="Вы уверены?"
          buttonText="Да"
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltipPopup
          message={message}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
