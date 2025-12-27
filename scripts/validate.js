// Muestra error
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_invalid");
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

// Chequea valididad de input con mensajes personalizados
function checkInputValidity(formElement, inputElement) {
  let errorMessage = "";
  if (inputElement.validity.valueMissing) {
    errorMessage = "Este campo es obligatorio.";
  } else if (inputElement.validity.typeMismatch) {
    errorMessage = "Por favor, introduce una dirección web válida.";
  } else if (inputElement.validity.tooShort) {
    errorMessage = `El texto debe tener al menos ${inputElement.minLength} caracteres; actualmente tiene ${inputElement.value.length}.`;
  } else if (!inputElement.validity.valid) {
    errorMessage = inputElement.validationMessage; // Fallback al default si hay otros errores
  }

  if (errorMessage) {
    showInputError(formElement, inputElement, errorMessage);
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
