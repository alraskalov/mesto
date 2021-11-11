export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    const cardImage = this._element.querySelector(".grid-photo__image");
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    this._element.querySelector(".grid-photo__title").textContent =
      this._data.name;

    return this._element;
  }

  _likeCard() {
    this._element
      .querySelector(".grid-photo__like")
      .classList.toggle("grid-photo__like_active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
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
        this._handleCardClick(
          this._element.querySelector(".grid-photo__image")
        );
      });
  }
}
