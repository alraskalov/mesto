import PopupWithForm from "./PoupWithForm";

export default class PopupWithAvatar extends PopupWithForm {
  constructor(popupElement, { handleFormSubmit }) {
    super(popupElement, handleFormSubmit);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".popup__form");
  }
}
