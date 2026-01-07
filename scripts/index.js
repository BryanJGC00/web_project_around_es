// index.js (reemplaza completo)
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  initialCards,
  validationConfig,
  openModal,
  closeModal,
} from "./utils.js";

// Selectores modales
const profileEditModal = document.querySelector("#edit-popup");
const newCardModal = document.querySelector("#new-card-popup");
const imageModal = document.querySelector("#image-popup");

// Botones cierre
const profileCloseButton = profileEditModal.querySelector(".popup__close");
const newCardCloseButton = newCardModal.querySelector(".popup__close");
const imageCloseButton = imageModal.querySelector(".popup__close");

// Formularios
const profileForm = profileEditModal.querySelector(".popup__form");
const newCardForm = newCardModal.querySelector(".popup__form");

const cardsList = document.querySelector(".cards__list");

function handleImageClick(data) {
  const popupImage = imageModal.querySelector(".popup__image");
  const popupCaption = imageModal.querySelector(".popup__caption");

  popupImage.src = data.link;
  popupImage.alt = `Imagen de ${data.name}`;
  popupCaption.textContent = data.name;

  openModal(imageModal);
}

initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  cardsList.append(card.generateCard());
});

// Botones edición/agregar
const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener("click", () => {
  const title = document.querySelector(".profile__title").textContent;
  const description = document.querySelector(
    ".profile__description"
  ).textContent;
  profileForm.querySelector("#name").value = title;
  profileForm.querySelector("#description").value = description;
  openModal(profileEditModal);
});

addButton.addEventListener("click", () => {
  openModal(newCardModal);
});

// Cierres específicos
profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
newCardCloseButton.addEventListener("click", () => closeModal(newCardModal));
imageCloseButton.addEventListener("click", () => closeModal(imageModal));

// Submit handlers
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const nameInput = profileForm.querySelector("#name").value;
  const descInput = profileForm.querySelector("#description").value;
  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__description").textContent = descInput;
  closeModal(profileEditModal);
});

function addNewCard(evt) {
  evt.preventDefault();
  const name = newCardForm.querySelector(".popup__input_type_card-name").value;
  const link = newCardForm.querySelector(".popup__input_type_url").value;
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  cardsList.prepend(card.generateCard());
  newCardForm.reset(); // Ya lo tienes
  newCardValidator.resetValidation(); // Nueva línea: Resetea validación
  closeModal(newCardModal);
}

// Cierres globales (Sprint 9: overlay y Esc)
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) closeModal(openedModal);
  }
});

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
});

// Validación (Sprint 9 con clase de Sprint 10)
const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();

const newCardValidator = new FormValidator(validationConfig, newCardForm);
newCardValidator.enableValidation();

// Cierra popups abiertos al load
const allPopups = document.querySelectorAll(".popup");
allPopups.forEach((popup) => {
  if (popup.classList.contains("popup_is-opened")) {
    closeModal(popup);
  }
});
