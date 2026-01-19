// scripts/Section.js
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }

  addItem(element) {
    this._container.append(element); // Cambiado a append para renderizar en orden exacto del array del server (sin prepend)
  }
}
