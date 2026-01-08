import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  initialCards,
  validationConfig,
  openModal,
  closeModal,
} from "./utils.js";

const profileEditModal = document.querySelector("#edit-popup");
const newCardModal = document.querySelector("#new-card-popup");
const imageModal = document.querySelector("#image-popup");

const profileCloseButton = profileEditModal.querySelector(".popup__close");
const newCardCloseButton = newCardModal.querySelector(".popup__close");
const imageCloseButton = imageModal.querySelector(".popup__close");

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

// Carga inicial de cards (ya lo tenías, bien)
initialCards.forEach((data) => {
  const card = new Card(data, "#card-template", handleImageClick);
  cardsList.append(card.generateCard());
});

// Nueva función: Handler para submit de perfil
function handleProfileSubmit(evt) {
  evt.preventDefault(); // Evita recarga de página (norma: preventDefault en submit – ficha "Manejo de eventos")

  const nameInput = profileForm.querySelector("#name");
  const descInput = profileForm.querySelector("#description");

  // Chequeo si inputs existen y válidos (evita errors – norma "Basics of the DOM")
  if (
    nameInput &&
    descInput &&
    nameInput.validity.valid &&
    descInput.validity.valid
  ) {
    document.querySelector(".profile__title").textContent = nameInput.value; // Actualiza DOM (textContent seguro)
    document.querySelector(".profile__description").textContent =
      descInput.value;

    closeModal(profileEditModal); // Cierra popup (UX: feedback inmediato)
    profileValidator.resetValidation(); // Reset para reabrir limpio
  }
}

// Nueva función: Handler para submit de nueva card
function handleNewCardSubmit(evt) {
  evt.preventDefault(); // Evita recarga

  const nameInput = newCardForm.querySelector("#card-name");
  const linkInput = newCardForm.querySelector("#card-link");

  // Chequeo válido (integra con validators)
  if (
    nameInput &&
    linkInput &&
    nameInput.validity.valid &&
    linkInput.validity.valid
  ) {
    const newData = { name: nameInput.value, link: linkInput.value };
    const newCard = new Card(newData, "#card-template", handleImageClick);
    cardsList.prepend(newCard.generateCard()); // Agrega al inicio (prepend para "nuevas primero" – opcional, puedes usar append)

    closeModal(newCardModal);
    newCardValidator.resetValidation(); // Reset: Abre vacío próximo vez
  }
}

// Agrega listeners a forms (nuevo – viola "Manejo de eventos" si no)
profileForm.addEventListener("submit", handleProfileSubmit);
newCardForm.addEventListener("submit", handleNewCardSubmit);

// Función openProfilePopup (ya corregida, con chequeos null)
function openProfilePopup() {
  const titleElement = document.querySelector(".profile__title");
  const descriptionElement = document.querySelector(".profile__description");

  if (!titleElement || !descriptionElement) {
    console.error("Elementos de profile no encontrados"); // Temporal, quita después
    return;
  }

  const nameInput = profileForm.querySelector("#name");
  const descInput = profileForm.querySelector("#description");

  if (nameInput && descInput) {
    nameInput.value = titleElement.textContent;
    descInput.value = descriptionElement.textContent;
  } else {
    console.error("Inputs de form no encontrados");
    return;
  }

  profileValidator.resetValidation(); // Limpia errores iniciales
  openModal(profileEditModal);
  nameInput.focus(); // UX: Focus en primer input
}

// Función openNewCardPopup (ya corregida)
function openNewCardPopup() {
  newCardForm.reset(); // Limpia a vacío
  newCardValidator.resetValidation();
  openModal(newCardModal);
  newCardModal.querySelector(".popup__input_type_card-name").focus();
}

const profileEditButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener("click", openProfilePopup);
addButton.addEventListener("click", openNewCardPopup);

profileCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
newCardCloseButton.addEventListener("click", () => closeModal(newCardModal));
imageCloseButton.addEventListener("click", () => closeModal(imageModal));

// Inicializa validators (ya lo tenías)
const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();

const newCardValidator = new FormValidator(validationConfig, newCardForm);
newCardValidator.enableValidation();
