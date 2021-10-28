import { initialCards, config } from "./data.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const root = document.querySelector(".root");
const gridPhoto = document.querySelector(".grid-photo");

const formAddCard = document.querySelector(".form-add")
const formEditProfile = document.querySelector(".form-edit")


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

const formProfileObject = new FormValidator(config, formEditProfile).enableValidation();
const formCardObject = new FormValidator(config, formAddCard).enableValidation();

const createCard = (data) => {
  const card = new Card(data, "#grid-photo", openImage).generateCard();
  gridPhoto.prepend(card);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
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
  popupImageLink.alt = currentImage.alt;
  popupImageText.textContent = currentImage.alt;
  openPopup(popupImage);
}

const buttonDisabled = () => {
  const activePopup = document.querySelector(".popup_opened");
  const button = activePopup.querySelector(config.submitButtonSelector);
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
  button.classList.remove(config.animationButtonSumbit);
};

function handlerFormEditProfile(e) {
  e.preventDefault();

  userName.textContent = nameInput.value;
  userProfession.textContent = jobInput.value;
  popupClose();
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
  popupClose();
}

popupEdit.addEventListener("submit", handlerFormEditProfile);
popupAdd.addEventListener("submit", handlerFormAddCard);

editButton.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  jobInput.value = userProfession.textContent;
  openPopup(popupEdit);
});

addButton.addEventListener("click", function () {
  openPopup(popupAdd);
});

initialCards.forEach((cardData) => {
  createCard(cardData);
});


