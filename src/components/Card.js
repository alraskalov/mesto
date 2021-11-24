export default class Card {
  constructor(
    { data, userId, handleCardClick, handleDeleteIconClick, handleLikeClick },
    cardSelector
  ) {
    this._data = data;
    this._cardId = data._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".grid-photo__element")
      .cloneNode(true);

    return cardElement;
  }

  _viewTrash() {
    if (this._userId === this._data.owner._id) {
      this._element.querySelector(".grid-photo__delete-button").style.display =
        "block";
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".grid-photo__image");
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;
    this._element.querySelector(".grid-photo__title").textContent =
      this._data.name;
    this._element.querySelector(".like-counter").textContent =
      this._data.likes.length;
    this._viewTrash();
    this.setLike(this._data)

    return this._element;
  }

  isLikedCard() {
    return Boolean(
      this._data.likes.find((item) => {
        return item._id === this._userId;
      })
    );
  }

  setLike(data) {
    this._data.likes = data.likes;
    this._element.querySelector(".like-counter").textContent =
      data.likes.length;
    if (this.isLikedCard()) {
      this._element
        .querySelector(".grid-photo__like")
        .classList.add("grid-photo__like_active");
    } else {
      this._element
        .querySelector(".grid-photo__like")
        .classList.remove("grid-photo__like_active");
    }
  }

  deleteCard() {
    this._element.remove()
    this._element = null
  }

  _setEventListeners() {
    this._element
      .querySelector(".grid-photo__like")
      .addEventListener("click", () => {
        this._handleLikeClick(this);
      });

    this._element
      .querySelector(".grid-photo__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteIconClick(this);
      });

    this._element
      .querySelector(".grid-photo__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._data);
      });
  }
}
