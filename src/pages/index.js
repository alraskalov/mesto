import { config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PoupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";
import PopupWithAvatar from "../components/PoupWithAvatar.js";

const gridPhoto = ".grid-photo";
const gridPhotoTemplate = "#grid-photo";

const popupImageLink = ".popup__image";
const popupImageDescription = ".popup__subtitle";

const formAddCard = document.querySelector(".form-add");
const formEditProfile = document.querySelector(".form-edit");
const formAvatarProfile = document.querySelector(".form-avatar");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup-edit");
const nameInput = document.querySelector("#user-name");
const jobInput = document.querySelector("#user-job");
const userName = document.querySelector(".profile__title");
const userAbout = document.querySelector(".profile__subtitle");
const userAvatar = document.querySelector(".profile__avatar");
const userAvatarButton = document.querySelector(".profile__avatar-edit");

const popupAdd = document.querySelector(".popup-add");
const popupImage = document.querySelector(".popup-image");
const popupDeleteCard = document.querySelector(".popup-delete");
const popupaAvatar = document.querySelector(".popup-avatar");

let userData = null;

// API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
  headers: {
    authorization: "314a6403-12f3-42b6-b8d1-07fca9f8b44c",
    "Content-Type": "application/json",
  },
});

const formProfileObject = new FormValidator(config, formEditProfile);
const formCardObject = new FormValidator(config, formAddCard);
const formProfileAvatarObject = new FormValidator(config, formAvatarProfile);
const userInfoObject = new UserInfo();

// Popup редактирования аватара пользователя
const popupAvatarObject = new PopupWithAvatar(popupaAvatar, {
  handleFormSubmit: (formData) => {
    renderLoadingButton(true, popupaAvatar);
    api
      .setUserAvatar(formData.link)
      .then((response) => {
        userInfoObject.setUserAvatar({ newAvatar: response.avatar });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingButton(false, popupaAvatar);
        popupAvatarObject.close();
      });
  },
});

const popupDeleteCardObject = new PopupWithSubmit(popupDeleteCard);

// Прелоадинг кнопок
const renderLoadingButton = (isLoading, popup) => {
  const initialSubmitButtonText = popup.querySelector(
    ".popup__submit-btn-text_initial"
  );
  const loadingSubmitButtonText = popup.querySelector(
    ".popup__submit-btn-text_loading"
  );
  if (isLoading) {
    initialSubmitButtonText.style.display = "none";
    loadingSubmitButtonText.style.display = "block";
  } else {
    initialSubmitButtonText.style.display = "block";
    loadingSubmitButtonText.style.display = "none";
  }
}

// Функция создания карточек
const createCard = (formData, userId) => {
  const card = new Card(
    {
      data: formData,
      userId: userId,
      handleCardClick: (dataCard) => {
        popupImageObject.open({ data: dataCard });
      },
      handleDeleteIconClick: (card) => {
        popupDeleteCardObject.open();
        popupDeleteCardObject.setFormSubmit(() => {
          renderLoadingButton(true, popupDeleteCard);
          api
            .deleteCard(card._cardId)
            .then(() => {
              card.deleteCard();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              renderLoadingButton(false, popupDeleteCard);
              popupDeleteCardObject.close();
            });
        });
      },
      handleLikeClick: (card) => {
        api
          .changeLikeCard(card._cardId, card.isLikedCard())
          .then((response) => {
            card.setLike(response);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    gridPhotoTemplate
  );
  return card.generateCard();
};

// Popup создания карточки
const popupCardObject = new PopupWithForm(popupAdd, {
  handleFormSubmit: (formData) => {
    renderLoadingButton(true, popupAdd);
    api
      .addCard(formData)
      .then((response) => {
        const cardElement = createCard(
          response,
          userInfoObject.getUserInfo().userId
        );
        cardList.prependItem(cardElement);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingButton(false, popupAdd);
        popupCardObject.close();
      });
  },
});

// Popup редактирования профиля
const popupProfileObject = new PopupWithForm(popupEdit, {
  handleFormSubmit: (formData) => {
    renderLoadingButton(true, popupEdit);
    api
      .setUserInfo(formData.userName, formData.userJob)
      .then((respnose) => {
        userInfoObject.setUserInfo({
          newName: respnose.name,
          newJob: respnose.about,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoadingButton(false, popupEdit);

        popupProfileObject.close();
      });
  },
});

// Popup открытия картинки
export const popupImageObject = new PopupWithImage(
  popupImage,
  popupImageLink,
  popupImageDescription
);

// Генерация карточек с сервера
const cardList = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item, userInfoObject.getUserInfo().userId);
      cardList.appendItem(cardElement);
    },
  },
  gridPhoto
);

// Получение ID пользователя и рендер карточек
api
  .getUserInfo()
  .then((userDataResponse) => {
    userInfoObject.setUserId({ id: userDataResponse._id });
    userData = userDataResponse;
    userName.textContent = userData.name;
    userAbout.textContent = userData.about;
    userAvatar.src = userData.avatar;
    api
      .getInitialCards()
      .then((data) => {
        cardList.renderItems(data);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  })

// Валидация инпутов форм
formProfileObject.enableValidation();
formCardObject.enableValidation();
formProfileAvatarObject.enableValidation();

popupCardObject.setEventListeners();
popupProfileObject.setEventListeners();
popupImageObject.setEventListeners();
popupAvatarObject.setEventListeners();
popupDeleteCardObject.setEventListeners();

// Слушатели кнопок
userAvatarButton.addEventListener("click", () => {
  formProfileAvatarObject.toggleButtonState();
  formProfileAvatarObject.clearValidation();
  popupAvatarObject.open();
});

editButton.addEventListener("click", function () {
  const getUserInfo = userInfoObject.getUserInfo();
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
