import { initialCards, config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PoupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

const gridPhoto = ".grid-photo";
const gridPhotoTemplate = "#grid-photo";

const formAddCard = document.querySelector(".form-add");
const formEditProfile = document.querySelector(".form-edit");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup-edit");
const nameInput = document.querySelector("#user-name");
const jobInput = document.querySelector("#user-job");
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__subtitle");

const popupAdd = document.querySelector(".popup-add");

const popupImage = document.querySelector(".popup-image");

const formProfileObject = new FormValidator(config, formEditProfile);
const formCardObject = new FormValidator(config, formAddCard);

formProfileObject.enableValidation();
formCardObject.enableValidation();

const createCard = (formData) => {
  const card = new Card(
    {
      data: formData,
      handleCardClick: (dataCard) => {
        popupImageObject.open({ data: dataCard });
      },
    },
    gridPhotoTemplate
  );
  const cardElement = card.generateCard();
  cardList.prependItem(cardElement);
};

const popupCardObject = new PopupWithForm(popupAdd, {
  handleFormSubmit: (formData) => {
    createCard(formData);
    popupCardObject.close();
  },
});

const userInfo = new UserInfo({
  nameElement: userName,
  jobElement: userJob,
});

const popupProfileObject = new PopupWithForm(popupEdit, {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      newName: formData.userName,
      newJob: formData.userJob,
    });

    popupProfileObject.close();
  },
});

export const popupImageObject = new PopupWithImage(
  popupImage,
  ".popup__image",
  ".popup__subtitle"
);

const cardList = new Section(
  {
    renderer: (item) => {
      createCard(item);
    },
  },
  gridPhoto
);

cardList.renderItems(initialCards);

popupCardObject.setEventListeners();
popupProfileObject.setEventListeners();
popupImageObject.setEventListeners();

editButton.addEventListener("click", function () {
  const getUserInfo = userInfo.getUserInfo();
  nameInput.value = getUserInfo.userName;
  jobInput.value = getUserInfo.userJob;
  formProfileObject.toggleButtonState();
  formProfileObject.clearValidation();
  popupProfileObject.open();
});

addButton.addEventListener("click", function () {
  formCardObject.toggleButtonState();
  formCardObject.clearValidation();
  popupCardObject.open();
});
