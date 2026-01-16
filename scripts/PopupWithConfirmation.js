// scripts/PopupWithConfirmation.js
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm; // Callback para "Sí" (delete API)
    this._confirmButton = this._popup.querySelector(".popup__confirm-button"); // Botón Sí
  }

  open(cardId, cardElement) {
    this._cardId = cardId; // Guardar ID para delete
    this._cardElement = cardElement; // Guardar elemento DOM para remover
    super.open(); // Usar open de Popup base
  }

  setEventListeners() {
    super.setEventListeners(); // Listeners base (close, overlay, Esc)
    this._confirmButton.addEventListener("click", this._onConfirm);
  }

  _onConfirm = () => {
    this._handleConfirm(this._cardId, this._cardElement); // Llamar callback para delete
    this.close();
  };
}
