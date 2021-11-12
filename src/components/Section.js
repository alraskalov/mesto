export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  appendItem(element) {
    this._container.append(element);
  }

  renderItems(renderedItems) {
    renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
