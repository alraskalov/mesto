import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = this._popupElement.querySelector(".popup__form");
    this._handlerSumbitCallback = null;
  }

  setFormSubmit(handler) {
    this._handlerSumbitCallback = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handlerSumbitCallback();
    });
  }
}
