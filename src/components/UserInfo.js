export default class UserInfo {
  constructor() {
    this._jobElement = document.querySelector(".profile__subtitle");
    this._nameElement = document.querySelector(".profile__title");
    this._avatar = document.querySelector(".profile__avatar");
  }

  setUserInfo({ newName, newJob }) {
    this._nameElement.textContent = newName;
    this._jobElement.textContent = newJob;
  }

  setUserAvatar({ newAvatar }) {
    this._avatar.src = newAvatar;
  }

  setUserId({ id }) {
    this._id = id;
  }

  getUserInfo() {
    return {
      userName: this._nameElement.textContent,
      userJob: this._jobElement.textContent,
      userAvatar: this._avatar.src,
      userId: this._id,
    };
  }
}
