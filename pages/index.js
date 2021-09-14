const popup = document.querySelector(".popup");
// Находим форму в DOM
let formElement = popup.querySelector(".popup__edit-from"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".form-name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".form-job"); // Воспользуйтесь инструментом .querySelector()
let popupOpen = document.querySelector(".popup-open");
let submitButton = formElement.querySelector(".popup__submit-btn");
let popupClose = formElement.querySelector(".popup__close-btn");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let titleInfo = document.querySelector(".info__title");
  let subtitleInfo = document.querySelector(".info__subtitle");
  // Вставьте новые значения с помощью textContent
  titleInfo.textContent = name;
  subtitleInfo.textContent = job;
  popup.classList.remove("popup__opened");
}

function popupToggle() {
  popup.classList.toggle("popup__opened");
  render();
}

function render() {
  let titleInfo = document.querySelector(".info__title");
  let subtitleInfo = document.querySelector(".info__subtitle");
  nameInput.value = titleInfo.textContent;
  jobInput.value = subtitleInfo.textContent;
}

popupOpen.addEventListener("click", popupToggle);
popupClose.addEventListener("click", popupToggle);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener("submit", formSubmitHandler);
