import {
  initialCards,
  config,
  formEditProfile,
  formAddCard,
  popupAdd,
  popupEdit,
  gridPhoto,
  editButton,
  addButton,
  userName,
  userJob,
  popupImage,
  nameInput,
  jobInput,
  gridPhotoTemplate,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PoupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const formProfileObject = new FormValidator(config, formEditProfile);
const formCardObject = new FormValidator(config, formAddCard);

formProfileObject.enableValidation();
formCardObject.enableValidation();

const popupCardObject = new PopupWithForm(popupAdd, {
  handleFormSubmit: (formData) => {
    const card = new Card(
      {
        data: formData,
        handleCardClick: (currentImage) => {
          popupImageObject.open(currentImage);
        },
      },
      gridPhotoTemplate
    );
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
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

export const popupImageObject = new PopupWithImage(popupImage);

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (currentImage) => {
            popupImageObject.open(currentImage);
          },
        },
        gridPhotoTemplate
      );
      const cardElement = card.generateCard();
      cardList.setItem(cardElement);
    },
  },
  gridPhoto
);

cardList.addItem();

editButton.addEventListener("click", function () {
  nameInput.value = userInfo.getUserInfo().userName;
  jobInput.value = userInfo.getUserInfo().userJob;
  formProfileObject.toggleButtonState();
  formProfileObject.clearValidation();
  popupProfileObject.open();
});

addButton.addEventListener("click", function () {
  formCardObject.toggleButtonState();
  formCardObject.clearValidation();
  popupCardObject.open();
});
