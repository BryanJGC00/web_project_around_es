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

// Set listeners para un form
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement); // Inicial

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Habilita validación para todos forms
function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}
