const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__input_type_error",
  animationButtonSumbit: "animation-button-submit",
};

const enableValidation = (config) => {
  const formLists = Array.from(document.querySelectorAll(config.formSelector));
  formLists.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const setEventListeners = (formElement, config) => {
  const inputLists = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  const submitButton = formElement.querySelector(config.submitButtonSelector);
  inputLists.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputLists, submitButton, config);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = "disabled";
    buttonElement.classList.remove(config.animationButtonSumbit);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
    buttonElement.classList.add(config.animationButtonSumbit);
  }
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

enableValidation(config);
