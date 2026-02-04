// scripts/Card.js
export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    userId,
    handleLikeCard,
    handleUnlikeCard,
  ) {
    this._text = data.name;
    this._imageLink = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked || false;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeCard = handleLikeCard;
    this._handleUnlikeCard = handleUnlikeCard;
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
    this._cardImage.alt = `Imagen de ${this._text}`;
    this._cardTitle.textContent = this._text;

    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    }

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteClick(this._id, this._element),
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({ name: this._text, link: this._imageLink }),
    );
  }

  _handleLike() {
    const isLiked = this._likeButton.classList.contains(
      "card__like-button_is-active",
    );
    if (isLiked) {
      this._handleUnlikeCard(this._id)
        .then((updatedCard) => {
          this._isLiked = updatedCard.isLiked || false;
          this._likeButton.classList.remove("card__like-button_is-active");
        })
        .catch((err) => {
          console.error("Error al quitar like:", err);
          // Revertir toggle en error
          this._likeButton.classList.add("card__like-button_is-active");
        });
    } else {
      this._handleLikeCard(this._id)
        .then((updatedCard) => {
          this._isLiked =
            updatedCard.isLiked ||
            this._likeButton.classList.add("card__like-button_is-active");
        })
        .catch((err) => {
          console.error("Error al dar like:", err);
          // Revertir toggle en error
          this._likeButton.classList.remove("card__like-button_is-active");
        });
    }
  }
}
