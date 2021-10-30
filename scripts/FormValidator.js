export default class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._formElement = formSelector;
    this._inputLists = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  enableValidation() {
    this._setEventListeners(this._formElement);
  }

  _setEventListeners() {
    this._inputLists.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  clearValidation() {
    this._inputLists.forEach((inputElement) => {
      this._hideInputError(inputElement);
      inputElement.value = "";
    });
  }

  toggleButtonState() {
    if (this._hasInvalidInput(this._inputLists)) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
      this._submitButton.classList.remove(this._config.animationButtonSumbit);
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
      this._submitButton.classList.add(this._config.animationButtonSumbit);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
}
