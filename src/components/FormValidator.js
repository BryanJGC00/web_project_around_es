// FormValidator.js
export default class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
    this._toggleButtonState(); // Valida estado inicial del botón
    // Importante: Valida todos los campos al cargar (sin '¡')
    this._inputList.forEach((input) => this._checkInputValidity(input));
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    let errorMessage = inputElement.validationMessage; // Mensaje por defecto del navegador

    // Mensajes custom en español según el error
    if (inputElement.validity.valueMissing) {
      errorMessage = "Por favor, rellena este campo";
    } else if (
      inputElement.validity.typeMismatch &&
      inputElement.type === "url"
    ) {
      errorMessage = "Por favor, introduce una dirección web válida";
    } else if (inputElement.validity.tooShort) {
      errorMessage = `El campo debe tener al menos ${inputElement.minLength} caracteres`;
    } else if (inputElement.validity.tooLong) {
      errorMessage = `El campo debe tener máximo ${inputElement.maxLength} caracteres`;
    }

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
      inputElement.classList.remove(this._inputErrorClass);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.value = ""; // Limpia los valores (opcional, pero buena práctica para UX)
    });
    this._toggleButtonState(); // Desactiva botón al reset
  }
}
