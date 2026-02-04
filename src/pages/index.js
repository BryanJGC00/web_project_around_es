// scripts/index.js
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { validationConfig } from "../components/utils.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "b92321ba-7015-4b3f-9bfc-df01004fd3b7",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm("#edit-popup", (data) => {
  api
    .editUserInfo({ name: data.name, about: data.about })
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

let cardSection;

const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  api
    .addCard({ name: data.name, link: data.link })
    .then((newCardData) => {
      const card = new Card(
        newCardData,
        "#card-template",
        (data) => imagePopup.open(data),
        (cardId, cardElement) => confirmPopup.open(cardId, cardElement),
        userData._id,
        api.likeCard.bind(api),
        api.unlikeCard.bind(api),
      );
      cardSection.addItem(card.generateCard());
      newCardPopup.close();
    })
    .catch((err) => console.error("Error al agregar card:", err));
});

newCardPopup.setEventListeners();

const confirmPopup = new PopupWithConfirmation(
  "#confirm-delete-popup",
  (cardId, cardElement) => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.error("Error al eliminar card:", err);
      });
  },
);
confirmPopup.setEventListeners();

const profileValidator = new FormValidator(
  validationConfig,
  profilePopup._form,
);
profileValidator.enableValidation();

const newCardValidator = new FormValidator(
  validationConfig,
  newCardPopup._form,
);
newCardValidator.enableValidation();

const avatarValidator = new FormValidator(validationConfig, avatarPopup._form);
avatarValidator.enableValidation();

document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const info = userInfo.getUserInfo();
    profilePopup._form.querySelector("#name").value = info.name;
    profilePopup._form.querySelector("#about").value = info.about;
    profileValidator.resetValidation();
    profilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});

document
  .querySelector(".profile__edit-avatar-button")
  .addEventListener("click", () => {
    const info = userInfo.getUserInfo();
    avatarPopup._form.querySelector("#avatar").value = info.avatar;
    avatarValidator.resetValidation();
    avatarPopup.open();
  });

let userData;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cardsData]) => {
    userData = user;
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });

    cardSection = new Section(
      {
        items: cardsData,
        renderer: (item) => {
          const card = new Card(
            item,
            "#card-template",
            (data) => imagePopup.open(data),
            (cardId, cardElement) => confirmPopup.open(cardId, cardElement),
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
