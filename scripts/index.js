// scripts/index.js
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import UserInfo from "./UserInfo.js";
import { initialCards, validationConfig } from "./utils.js"; // Mantiene constantes

// Instancias
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm("#edit-popup", (data) => {
  userInfo.setUserInfo({ name: data.name, job: data.description });
});
profilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
  const card = new Card(
    { name: data.name || "", link: data.link || "" },
    "#card-template",
    (cardData) => imagePopup.open(cardData)
  );
  cardSection.addItem(card.generateCard());
});
newCardPopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, "#card-template", (cardData) =>
        imagePopup.open(cardData)
      );
      return card.generateCard();
    },
  },
  ".cards__list"
);
cardSection.renderItems();

// Validadores (por instancia de popup)
const profileValidator = new FormValidator(
  validationConfig,
  profilePopup._form
);
profileValidator.enableValidation();

const newCardValidator = new FormValidator(
  validationConfig,
  newCardPopup._form
);
newCardValidator.enableValidation();

// Listeners para abrir
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const info = userInfo.getUserInfo();
    profilePopup._form.querySelector("#name").value = info.name;
    profilePopup._form.querySelector("#description").value = info.job;
    profileValidator.resetValidation();
    profilePopup.open();
  });

document.querySelector(".profile__add-button").addEventListener("click", () => {
  newCardValidator.resetValidation();
  newCardPopup.open();
});
