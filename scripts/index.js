const initialCards = [
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

const root = document.querySelector(".root");
const gridPhoto = document.querySelector(".grid-photo");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup-edit");
let nameInput = document.querySelector("#userName");
let jobInput = document.querySelector("#userJob");
let userName = document.querySelector(".profile__title");
let userProfession = document.querySelector(".profile__subtitle");

const popupAdd = document.querySelector(".popup-add");

const popupImage = document.querySelector(".popup-image");
const popupImageLink = popupImage.querySelector(".popup__image");
const popupImageText = popupImage.querySelector(".popup__subtitle");

function switchPopup(popup) {
  popup.classList.toggle("popup_opened");
}

function openImage(currentImage) {
  currentImage.addEventListener("click", function (e) {
    popupImageLink.src = e.target.src;
    popupImageText.textContent = e.target.closest(
      ".grid-photo__element"
    ).textContent;
    switchPopup(popupImage);
  });
}

function renderGridPhoto(gridPhotoName, gridPhotoLink) {
  const gridPhotoTemplate = document.querySelector("#grid-photo").content;
  const gridPhotoElement = gridPhotoTemplate
    .querySelector(".grid-photo__element")
    .cloneNode(true);
  gridPhotoElement.querySelector(".grid-photo__image").src = gridPhotoLink;
  gridPhotoElement.querySelector(".grid-photo__image").alt = gridPhotoName;
  gridPhotoElement.querySelector(".grid-photo__title").textContent =
    gridPhotoName;

  const likeButton = gridPhotoElement.querySelector(".grid-photo__like");
  likeButton.addEventListener("click", (e) =>
    e.target.classList.toggle("grid-photo__like_active")
  );
  const deleteButton = gridPhotoElement.querySelector(
    ".grid-photo__delete-button"
  );
  deleteButton.addEventListener("click", (e) =>
    e.target.closest(".grid-photo__element").remove()
  );

  const currentImage = gridPhotoElement.querySelector(".grid-photo__image");
  openImage(currentImage);

  return gridPhotoElement;
}

function handlerCloseButtonClick(e) {
  const currentTarget = e.target;
  if (currentTarget.classList.contains("popup__close-btn")) {
    const currentPopup = document.querySelector(".popup_opened");
    if (currentPopup) {
      switchPopup(currentPopup);
    }
  }
}

function handlerFormSubmit(e) {
  e.preventDefault();

  userName.textContent = nameInput.value;
  userProfession.textContent = jobInput.value;
  switchPopup(popupEdit);
}

function handlerFormAdd(e) {
  e.preventDefault();
  const data = {
    name: document.querySelector("#imageName").value,
    link: document.querySelector("#imageLink").value,
  };

  gridPhoto.prepend(renderGridPhoto(data.name, data.link));

  switchPopup(popupAdd);
}

root.addEventListener("click", handlerCloseButtonClick);
popupEdit.addEventListener("submit", handlerFormSubmit);
popupAdd.addEventListener("submit", handlerFormAdd);

editButton.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  jobInput.value = userProfession.textContent;
  switchPopup(popupEdit);
});
addButton.addEventListener("click", function () {
  switchPopup(popupAdd);
});

initialCards.forEach((elem) => {
  gridPhoto.prepend(renderGridPhoto(elem.name, elem.link));
});
