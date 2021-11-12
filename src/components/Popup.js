export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);

  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close-btn")
      .addEventListener("click", () => {
        this.close();
      });

    this._popupElement.addEventListener("click", (evt) => {
      const target = evt.target;
      if (target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
