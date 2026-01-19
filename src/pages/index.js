// scripts/index.js
import Card from "../components/Card.js"; // Cambio: Ajuste relativo desde pages/ a scripts/
import FormValidator from "../components/FormValidator.js"; // Cambio
import Section from "../components/Section.js"; // Cambio
import PopupWithForm from "../components/PopupWithForm.js"; // Cambio
import PopupWithImage from "../components/PopupWithImage.js"; // Cambio
import UserInfo from "../components/UserInfo.js"; // Cambio
import Api from "../components/Api.js"; // Cambio: Importamos la clase Api
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"; // Cambio: Nuevo import para popup confirm
import { validationConfig } from "../components/utils.js"; // Cambio

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "b92321ba-7015-4b3f-9bfc-df01004fd3b7",
    "Content-Type": "application/json",
  },
});

// Instancias
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description", // Cambiado de jobSelector para consistencia
  avatarSelector: ".profile__image", // Selector para img de avatar (coincide con HTML)
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm("#edit-popup", (data) => {
  api
    .editUserInfo({ name: data.name, about: data.about }) // Cambiado: Usa 'about' directamente
    .then((updatedUser) => {
      userInfo.setUserInfo({
        name: updatedUser.name,
        about: updatedUser.about,
        avatar: updatedUser.avatar,
      });
      profilePopup.close();
    })
    .catch((err) => console.error("Error al editar user info:", err));
});

profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm("#edit-avatar-popup", (data) => {
  api
    .updateAvatar(data.avatar)
    .then((updatedUser) => {
      userInfo.setUserInfo({
        name: updatedUser.name,
        about: updatedUser.about,
        avatar: updatedUser.avatar,
      });
      avatarPopup.close();
    })
    .catch((err) => console.error("Error al actualizar avatar:", err));
});

avatarPopup.setEventListeners();

let cardSection; // Declarar aquí para scope global (fix ReferenceError)

const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  api
    .addCard({ name: data.name, link: data.link })
    .then((newCardData) => {
      const card = new Card(
        newCardData,
        "#card-template",
        (data) => imagePopup.open(data),
        (cardId, cardElement) => confirmPopup.open(cardId, cardElement), // Callback para abrir confirm
        userData._id,
        api.likeCard.bind(api),
        api.unlikeCard.bind(api),
      );
      cardSection.addItem(card.generateCard()); // Ahora accesible
      newCardPopup.close();
    })
    .catch((err) => console.error("Error al agregar card:", err));
});

newCardPopup.setEventListeners();

// Nueva instancia para popup confirm delete
const confirmPopup = new PopupWithConfirmation(
  "#confirm-delete-popup",
  (cardId, cardElement) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove(); // Remover del DOM si success
      })
      .catch((err) => {
        console.error("Error al eliminar card:", err);
      });
  },
);
confirmPopup.setEventListeners(); // Activa listeners para X/Esc/overlay

// Validador para form de profile
const profileValidator = new FormValidator(
  validationConfig,
  profilePopup._form,
);
profileValidator.enableValidation();

// Validador para form de new card
const newCardValidator = new FormValidator(
  validationConfig,
  newCardPopup._form,
);
newCardValidator.enableValidation();

// Nuevo validador para form de avatar
const avatarValidator = new FormValidator(validationConfig, avatarPopup._form);
avatarValidator.enableValidation();

// Listeners
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const info = userInfo.getUserInfo();
    profilePopup._form.querySelector("#name").value = info.name;
    profilePopup._form.querySelector("#about").value = info.about; // Cambiado: Usa '#about' y 'info.about'
    profileValidator.resetValidation();
    profilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

// Nuevo listener para botón de editar avatar
document
  .querySelector(".profile__edit-avatar-button")
  .addEventListener("click", () => {
    const info = userInfo.getUserInfo();
    avatarPopup._form.querySelector("#avatar").value = info.avatar; // Precarga el avatar actual
    avatarValidator.resetValidation();
    avatarPopup.open();
  });

// Carga inicial
let userData; // Para guardar globalmente
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cardsData]) => {
    userData = user;
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });

    cardSection = new Section( // Asignar aquí
      {
        items: cardsData,
        renderer: (item) => {
          const card = new Card(
            item,
            "#card-template",
            (data) => imagePopup.open(data),
            (cardId, cardElement) => confirmPopup.open(cardId, cardElement), // Callback para abrir confirm
            user._id,
            api.likeCard.bind(api),
            api.unlikeCard.bind(api),
          );
          return card.generateCard();
        },
      },
      ".cards__list",
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error("Error al cargar datos iniciales:", err);
  });
