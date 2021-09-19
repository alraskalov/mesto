const popup = document.querySelector(".popup");

let formElement = popup.querySelector(".popup__edit-form");

let nameInput = formElement.querySelector("#userName");
let jobInput = formElement.querySelector("#userJob");
let popupOpen = document.querySelector(".popup-open");
let popupClose = formElement.querySelector(".popup__close-btn");
let userName = document.querySelector(".profile__title");
let userProfession = document.querySelector(".profile__subtitle");

function switchPopup () {
  popup.classList.toggle("popup_opened");
  nameInput.value = userName.textContent;
  jobInput.value = userProfession.textContent;
}

function handlerFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userProfession.textContent = jobInput.value;
  switchPopup();
}

popupOpen.addEventListener("click", switchPopup);
popupClose.addEventListener("click", switchPopup);
formElement.addEventListener("submit", handlerFormSubmit);
