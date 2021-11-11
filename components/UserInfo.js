export default class UserInfo {
  constructor({ nameElement, jobElement }) {
    this._jobElement = jobElement;
    this._nameElement = nameElement;
  }

  setUserInfo({ newName, newJob }) {
    this._nameElement.textContent = newName;
    this._jobElement.textContent = newJob;
  }

  getUserInfo() {
    return {
      userName: this._nameElement.textContent,
      userJob: this._jobElement.textContent,
    };
  }
}
