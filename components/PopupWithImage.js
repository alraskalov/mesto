import Popup from "./Popup.js";
import { popupImageLink, popupImageText } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(currentImage) {
    popupImageLink.src = currentImage.src;
    popupImageLink.alt = currentImage.alt;
    popupImageText.textContent = currentImage.alt;
    super.open();
  }
}
