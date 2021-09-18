const popup = document.querySelector(".popup");

let formElement = popup.querySelector(".popup__edit-form");

let nameInput = formElement.querySelector("#userName");
let jobInput = formElement.querySelector("#userJob");
let popupOpen = document.querySelector(".popup-open");
let popupClose = formElement.querySelector(".popup__close-btn");
let userName = document.querySelector(".profile__title");
let userProfession = document.querySelector(".profile__subtitle");

function openPopup () {
  popup.classList.toggle("popup_opened", true);
  nameInput.value = userName.textContent;
  jobInput.value = userProfession.textContent;
}

function closePopup () {
  if(popup.classList.contains("popup_opened")) {
    popup.classList.toggle("popup_opened", false);
  }
}

function handlerFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userProfession.textContent = jobInput.value;
  closePopup();
}

popupOpen.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);
formElement.addEventListener("submit", handlerFormSubmit);
