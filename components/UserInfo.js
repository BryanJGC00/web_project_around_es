// scripts/UserInfo.js
export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector); // Cambiado de _jobElement para consistencia
    this._avatarElement = document.querySelector(avatarSelector); // Nuevo: Para manejar avatar del perfil
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent, // Cambiado de job para coincidir con API
      avatar: this._avatarElement.src, // Nuevo: Retorna avatar actual para consistencia
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about; // Cambiado de job para coincidir con API
    if (avatar) {
      this._avatarElement.src = avatar; // Nuevo: Actualiza src del avatar si se pasa (opcional)
    }
  }
}
