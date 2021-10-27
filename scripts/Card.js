export default class Card {
  constructor(initialCards, cardSelector, callbackOpenCardImage) {
    this._initialCards = initialCards;
    this._cardSelector = cardSelector;
    this._callbackOpenCardImage = callbackOpenCardImage;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".grid-photo__element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".grid-photo__image").src =
      this._initialCards.link;
    this._element.querySelector(".grid-photo__image").alt =
      this._initialCards.name;
    this._element.querySelector(".grid-photo__title").textContent =
      this._initialCards.name;

    return this._element;
  }

  _likeCard() {
    this._element
      .querySelector(".grid-photo__like")
      .classList.toggle("grid-photo__like_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  _handleOpenImage() {
    this._callbackOpenCardImage(
      this._element.querySelector(".grid-photo__image")
    );
  }

  _setEventListeners() {
    this._element
      .querySelector(".grid-photo__like")
      .addEventListener("click", () => {
        this._likeCard();
      });

    this._element
      .querySelector(".grid-photo__delete-button")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._element
      .querySelector(".grid-photo__image")
      .addEventListener("click", () => {
        this._handleOpenImage();
      });
  }
}
