export default class UserInfo {
  constructor(userNameElement, userJobElement, userAvatarElement) {
    this._jobElement = userJobElement;
    this._nameElement = userNameElement;
    this._avatar = userAvatarElement;
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
