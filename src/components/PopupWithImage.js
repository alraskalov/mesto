import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement, imageLinkSelector, imageDescriptionSelector) {
    super(popupElement);
    this._imageLink = this._popupElement.querySelector(imageLinkSelector)
    this._imageDescription = this._popupElement.querySelector(imageDescriptionSelector)
  }

  open({data}) {
    this._imageLink.src = data.link;
    this._imageLink.alt = data.name;
    this._imageDescription.textContent = data.name;
    super.open();
  }
}
