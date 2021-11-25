export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(res => this._getResponse(res));
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(res => this._getResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(res => this._getResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(res => this._getResponse(res));
  }

  setUserInfo(userName, userAbout) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout,
      }),
    }).then(res => this._getResponse(res));
  }

  setUserAvatar(userAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: userAvatar,
      }),
    }).then(res => this._getResponse(res));
  }

  changeLikeCard(cardId, isLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: isLiked ? "DELETE" : "PUT",
        headers: this._headers,
      }).then(res => this._getResponse(res));
  }

  _getResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}
