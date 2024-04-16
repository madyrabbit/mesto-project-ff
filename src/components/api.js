// Получение информации о пользователе
export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    fetch('https://nomoreparties.co/v1/wff-cohort-11/users/me', {
      headers: {
        authorization: '931f9416-6641-4dfc-be73-22f2347fb5c6',
        "Content-Type": "application/json",
      }
    })
    .then(response => resolve(response.json()))
    .catch(error => reject(error));
  });
};

// Получение списка карточек
export const getCardList = () => {
  return new Promise((resolve, reject) => {
    fetch('https://nomoreparties.co/v1/wff-cohort-11/cards', {
      headers: {
        authorization: '931f9416-6641-4dfc-be73-22f2347fb5c6',
        "Content-Type": "application/json",
      }
    })
      .then(response => resolve(response.json()))
      .catch(error => reject(error));
  });
};

// // Отправить новую карточку на сервер
export const sendNewCardServer = (cardData) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-11/cards', {
    method: 'POST',
    headers: {
      authorization: '931f9416-6641-4dfc-be73-22f2347fb5c6',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    })
  })
};

  // Отправить профиль пользователя на сервер
export const sendUserProfile = (nameProfile, aboutProfile) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-11/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '931f9416-6641-4dfc-be73-22f2347fb5c6',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameProfile,
      about: aboutProfile
    })
  })
}

// Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-11/cards/${cardId}`, {
    method: "DELETE",
    authorization: "525d9810-1f71-4b0b-b990-61c4da29ce8a",
    "Content-Type": "application/json",
  })
  .then(response => resolve(response.json()))
  .catch(error => reject(error));
}