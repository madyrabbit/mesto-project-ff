const serverAddress = 'https://nomoreparties.co/v1/wff-cohort-11';

// Запросы к серверу
const config = {
  headers: {
    authorization: '931f9416-6641-4dfc-be73-22f2347fb5c6',
    'Content-Type': 'application/json'
  }
};

// Ответ от сервера
const responseFromServer = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Возникла ошибка: ${res.status}`);
};

// Получение информации о пользователе
export const getUserInfo = () => {
  return fetch(`${serverAddress}/users/me`, {
      headers: config.headers,
  }).then((res) => responseFromServer(res));
};

// Получение списка карточек
export const getCardList = () => {
  return fetch(`${serverAddress}/cards`, {
      headers: config.headers,
  }).then((res) => responseFromServer(res));
};

// // Отправить новую карточку на сервер
export const sendNewCardServer = (nameCard, linkCard) => {
  return fetch(`${serverAddress}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    })
  }).then((res) => responseFromServer(res));
};

  // Отправить профиль пользователя на сервер
export const sendUserProfile = (nameUser, aboutUser) => {
  return fetch(`${serverAddress}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameUser,
      about: aboutUser,
    })
  }).then((res) => responseFromServer(res));
};

// Добавление лайка
export const addLike = (card) => {
  return fetch(`${serverAddress}/cards/likes/${card}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => responseFromServer(res));
};

// Удаление лайка
export const deleteLike = (card) => {
  return fetch(`${serverAddress}/cards/likes/${card}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => responseFromServer(res));
};

// Удаление карточки
export const deleteCard = (card) => {
  return fetch(`${serverAddress}/cards/${card}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => responseFromServer(res));
};

// Смена аватара пользователя
export const changeAvatar = (avatar) => {
  return fetch(`${serverAddress}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  }).then((res) => responseFromServer(res));
};