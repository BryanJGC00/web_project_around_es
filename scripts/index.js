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

// Selecciona la lista donde se agregarán las tarjetas
const cardsList = document.querySelector(".cards__list");
// Selecciona el contenido del template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Recorre el array y renderiza cada tarjeta
initialCards.forEach((cardData) => {
  // Clona el template
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Rellena con datos
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener("click", () => {
    popupImage.src = cardData.link; // o newCardData.link en handleNewCardSubmit
    popupImage.alt = cardData.name;
    popupCaption.textContent = cardData.name;
    openModal(imageModal);
  });

  // Agrega al DOM
  cardsList.append(cardElement);
});

const profileEditButton = document.querySelector(".profile__edit-button");
const profileModal = document.getElementById("edit-popup");
const modalCloseButton = profileModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = profileModal.querySelector(".popup__input_type_name");
const descriptionInput = profileModal.querySelector(
  ".popup__input_type_description"
);

const addButton = document.querySelector(".profile__add-button");
const newCardModal = document.getElementById("new-card-popup");
const newCardCloseButton = newCardModal.querySelector(".popup__close");
const newCardForm = newCardModal.querySelector("#new-card-form");

const profileForm = profileModal.querySelector("#edit-profile-form");

const imageModal = document.getElementById("image-popup");
const imageCloseButton = imageModal.querySelector(".popup__close");
const popupImage = imageModal.querySelector(".popup__image");
const popupCaption = imageModal.querySelector(".popup__caption");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(profileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileModal);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const placeNameInput = newCardForm.querySelector(
    ".popup__input_type_card-name"
  );
  const linkInput = newCardForm.querySelector(".popup__input_type_url");
  const newCardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };

  // Clona y rellena
  const cardElement = cardTemplate.cloneNode(true);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = newCardData.link;
  cardImage.alt = newCardData.name;

  // Agrega event para imagen (después de seleccionar cardImage)
  cardImage.addEventListener("click", () => {
    popupImage.src = newCardData.link;
    popupImage.alt = newCardData.name; // Corregido: newCardData en lugar de cardData
    popupCaption.textContent = newCardData.name; // Corregido
    openModal(imageModal);
  });

  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = newCardData.name;

  // Agrega al inicio
  cardsList.prepend(cardElement);

  // Limpia y cierra
  newCardForm.reset();
  closeModal(newCardModal);
}

// Muestra error
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_invalid"); // Agrega clase para borde rojo (define en CSS si no usas :invalid)
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
}

// Oculta error
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_invalid");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
}

// Chequea valididad de input
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage); // Mensaje default
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Toggle button basado en valididad de todos inputs
function toggleButtonState(inputList, buttonElement) {
  const isInvalid = inputList.some((input) => !input.validity.valid);
  buttonElement.disabled = isInvalid;
}

// Habilita validación para todos forms
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

// Para edit
function handleOpenEditModal() {
  fillProfileForm();
  const form = profileForm;
  Array.from(form.querySelectorAll(".popup__input")).forEach(
    hideInputError.bind(null, form)
  ); // Oculta errores
  form.querySelector(".popup__button").disabled = true; // Disable inicial
  openModal(profileModal);
}

// Para new card (en addButton listener)
addButton.addEventListener("click", () => {
  const form = newCardForm;
  Array.from(form.querySelectorAll(".popup__input")).forEach(
    hideInputError.bind(null, form)
  );
  form.querySelector(".popup__button").disabled = true;
  openModal(newCardModal);
});

profileEditButton.addEventListener("click", handleOpenEditModal);
modalCloseButton.addEventListener("click", () => closeModal(profileModal));
profileForm.addEventListener("submit", handleProfileFormSubmit);

addButton.addEventListener("click", () => openModal(newCardModal));
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
