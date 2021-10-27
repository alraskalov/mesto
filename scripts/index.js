import { initialCards, config } from "./data.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const root = document.querySelector(".root");
const gridPhoto = document.querySelector(".grid-photo");

const formLists = Array.from(document.querySelectorAll(config.formSelector));

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

function openPopup(popUp) {
  popUp.classList.add("popup_opened");
  root.addEventListener("click", handlerClosePopupClick);
  document.addEventListener("keydown", closePopupByKey);
}

function closePopupByKey(evt) {
  if (evt.key === "Escape") {
    popupClose();
  }
}

function handlerClosePopupClick(evt) {
  const target = evt.target;
  if (
    target.classList.contains("popup__close-btn") ||
    target.classList.contains("popup")
  ) {
    popupClose();
  }
}

function popupClose() {
  const activePopup = document.querySelector(".popup_opened");
  if (activePopup) {
    activePopup.classList.remove("popup_opened");
    root.removeEventListener("click", handlerClosePopupClick);
    document.removeEventListener("keydown", closePopupByKey);
  }
}

function openImage(currentImage) {
  popupImageLink.src = currentImage.src;
  popupImageText.textContent = currentImage.alt;
  openPopup(popupImage);
}

const buttonDisabled = () => {
  const activePopup = document.querySelector(".popup_opened");
  const button = activePopup.querySelector(config.submitButtonSelector);
  button.classList.add(config.inactiveButtonClass);
  button.disabled = "disabled";
  button.classList.remove(config.animationButtonSumbit);
};

function handlerFormSubmit(e) {
  e.preventDefault();

  userName.textContent = nameInput.value;
  userProfession.textContent = jobInput.value;
  popupClose();
}

function handlerFormAdd(e) {
  e.preventDefault();
  const data = {
    name: gridImageName.value,
    link: gridImageLink.value,
  };

  const card = new Card(data, "#grid-photo", openImage).generateCard();

  gridPhoto.prepend(card);
  gridImageName.value = "";
  gridImageLink.value = "";
  popupClose();
}

popupEdit.addEventListener("submit", handlerFormSubmit);
popupAdd.addEventListener("submit", handlerFormAdd);

editButton.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  jobInput.value = userProfession.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener("click", function () {
  openPopup(popupAdd);
  buttonDisabled();
});

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#grid-photo", openImage).generateCard();
  gridPhoto.prepend(card);
});

formLists.forEach(formElement => {
  const form = new FormValidator(config, formElement).enableValidation();
})
