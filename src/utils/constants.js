export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  animationButtonSumbit: "animation-button-submit",
};

export const gridPhoto = ".grid-photo";
export const gridPhotoTemplate = "#grid-photo";

export const formAddCard = document.querySelector(".form-add");
export const formEditProfile = document.querySelector(".form-edit");

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");

export const popupEdit = document.querySelector(".popup-edit");
export const nameInput = document.querySelector("#user-name");
export const jobInput = document.querySelector("#user-job");
export const userName = document.querySelector(".profile__title");
export const userJob = document.querySelector(".profile__subtitle");

export const popupAdd = document.querySelector(".popup-add");

export const popupImage = document.querySelector(".popup-image");
export const popupImageLink = popupImage.querySelector(".popup__image");
export const popupImageText = popupImage.querySelector(".popup__subtitle");
