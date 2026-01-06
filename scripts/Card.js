// Card.js
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._text = data.name;
    this._imageLink = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick; // Función para abrir popup de imagen
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage.src = this._imageLink;
    this._cardImage.alt = `Imagen de ${this._text}`; // Accesibilidad: alt descriptivo
    this._cardTitle.textContent = this._text;

    this._setEventListeners(); // Método privado para eventos

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({ name: this._text, link: this._imageLink })
    );
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._element.remove();
  }
}
