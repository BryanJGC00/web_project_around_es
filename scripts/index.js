import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    const imageModal = document.querySelector("#image-popup");
    const popupImage = imageModal.querySelector(".popup__image");
    const popupCaption = imageModal.querySelector(".popup__caption");
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imageModal);
  });

  return cardElement;
}

function renderCard(cardElement) {
  cardsList.prepend(cardElement);
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  renderCard(cardElement);
});

const profileEditButton = document.querySelector(".profile__edit-button");
const profileModal = document.querySelector("#edit-popup");
const modalCloseButton = profileModal.querySelector(".popup__close");
const profileForm = profileModal.querySelector(".popup__form");
const nameInput = profileForm
  ? profileForm.querySelector(".popup__input_type_name")
  : null;
const descriptionInput = profileForm
  ? profileForm.querySelector(".popup__input_type_description")
  : null;

const addButton = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#add-popup");
const newCardCloseButton = newCardModal.querySelector(".popup__close");
const newCardForm = newCardModal.querySelector(".popup__form");

const imageModal = document.querySelector("#image-popup");
const imageCloseButton = imageModal.querySelector(".popup__close");

function openModal(modal) {
  if (modal) {
    modal.classList.add("popup_is-opened");
  }
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("popup_is-opened");
  }
}

function fillProfileForm() {
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  if (nameInput && profileTitle) {
    nameInput.value = profileTitle.textContent;
  } else {
    console.log("nameInput or profileTitle not found - depuración");
  }

  if (descriptionInput && profileDescription) {
    descriptionInput.value = profileDescription.textContent;
  } else {
    console.log(
      "descriptionInput or profileDescription not found - depuración"
    );
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  if (profileTitle && nameInput) {
    profileTitle.textContent = nameInput.value;
  }
  if (profileDescription && descriptionInput) {
    profileDescription.textContent = descriptionInput.value;
  }
  closeModal(profileModal);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const name = newCardForm.querySelector(".popup__input_type_card-name").value;
  const link = newCardForm.querySelector(".popup__input_type_url").value;
  const cardElement = createCard({ name, link });
  renderCard(cardElement);
  newCardForm.reset();
  closeModal(newCardModal);
}

function handleOpenEditModal() {
  console.log("Botón de edición clickeado - depuración");
  fillProfileForm();
  const form = profileForm;
  if (form) {
    Array.from(form.querySelectorAll(".popup__input")).forEach(
      hideInputError.bind(null, form)
    );
    const button = form.querySelector(".popup__button");
    if (button) button.disabled = false;
  }
  openModal(profileModal);
}

profileEditButton.addEventListener("click", handleOpenEditModal);
modalCloseButton.addEventListener("click", () => closeModal(profileModal));
profileForm.addEventListener("submit", handleProfileFormSubmit);

addButton.addEventListener("click", () => {
  console.log("Botón de agregar clickeado - depuración");
  const form = newCardForm;
  Array.from(form.querySelectorAll(".popup__input")).forEach(
    hideInputError.bind(null, form)
  );
  form.querySelector(".popup__button").disabled = true;
  openModal(newCardModal);
});
newCardCloseButton.addEventListener("click", () => closeModal(newCardModal));
newCardForm.addEventListener("submit", handleNewCardSubmit);

imageCloseButton.addEventListener("click", () => closeModal(imageModal));

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

enableValidation();

initialCards.forEach((card) => {
  console.log(card.name);
});
