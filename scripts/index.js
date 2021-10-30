import { initialCards, config } from "./data.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const gridPhoto = document.querySelector(".grid-photo");

const formAddCard = document.querySelector(".form-add");
const formEditProfile = document.querySelector(".form-edit");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup-edit");
const nameInput = document.querySelector("#user-name");
const jobInput = document.querySelector("#user-job");
const userName = document.querySelector(".profile__title");
const userProfession = document.querySelector(".profile__subtitle");

const popupAdd = document.querySelector(".popup-add");

const gridImageName = document.querySelector("#image-name");
const gridImageLink = document.querySelector("#image-link");

const popupImage = document.querySelector(".popup-image");
const popupImageLink = popupImage.querySelector(".popup__image");
const popupImageText = popupImage.querySelector(".popup__subtitle");

const formProfileObject = new FormValidator(config, formEditProfile);
const formCardObject = new FormValidator(config, formAddCard);

formProfileObject.enableValidation();
formCardObject.enableValidation();

const createCard = (data) => {
  const card = new Card(data, "#grid-photo", openImage).generateCard();
  gridPhoto.prepend(card);
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByKey);
}

function closePopupByKey(evt) {
  const activePopup = document.querySelector(".popup_opened");
  if (activePopup && evt.key === "Escape") {
    popupClose(activePopup);
  }
}

function handlerClosePopupClick(evt) {
  const target = evt.target;
  const activePopup = document.querySelector(".popup_opened");
  if (
    target.classList.contains("popup__close-btn") ||
    target.classList.contains("popup")
  ) {
    popupClose(activePopup);
  }
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByKey);
}

function openImage(currentImage) {
  popupImageLink.src = currentImage.src;
  popupImageLink.alt = currentImage.alt;
  popupImageText.textContent = currentImage.alt;
  openPopup(popupImage);
}

function handlerFormEditProfile(e) {
  e.preventDefault();

  userName.textContent = nameInput.value;
  userProfession.textContent = jobInput.value;
  popupClose(popupEdit);
}

function handlerFormAddCard(e) {
  e.preventDefault();
  const data = {
    name: gridImageName.value,
    link: gridImageLink.value,
  };

  createCard(data);
  gridImageName.value = "";
  gridImageLink.value = "";
  popupClose(popupAdd);
}

popupEdit.addEventListener("submit", handlerFormEditProfile);
popupAdd.addEventListener("submit", handlerFormAddCard);

popupEdit.addEventListener("click", handlerClosePopupClick);
popupAdd.addEventListener("click", handlerClosePopupClick);
popupImage.addEventListener("click", handlerClosePopupClick);

editButton.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  jobInput.value = userProfession.textContent;
  formProfileObject.toggleButtonState();
  openPopup(popupEdit);
});

addButton.addEventListener("click", function () {
  formCardObject.toggleButtonState();
  formCardObject.clearValidation();
  openPopup(popupAdd);
});

initialCards.forEach((cardData) => {
  createCard(cardData);
});
