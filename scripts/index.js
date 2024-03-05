// Функция для создания новой карточки на основе данных карточки
function createCard(cardData){
  // @todo: Темплейт карточки
  // Получаем доступ к содержимому шаблона карточки в HTML по его идентификатору и создаем копию элемента карточки для заполнения данными
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // @todo: DOM узлы
  // Устанавливаем атрибуты изображения карточки (ссылку и альтернативный текст) на основе данных карточки
  cardElement.querySelector('.card__image').src = cardData.link; // Установка ссылки на изображение
  cardElement.querySelector('.card__image').alt = cardData.name; // Установка альтернативного текста изображения
  // Устанавливаем название карточки на основе данных карточки
  cardElement.querySelector('.card__title').textContent = cardData.name; // Установка названия места

  // @todo: Функция удаления карточки
  // Добавляем обработчик события клика на кнопку удаления карточки, чтобы при клике карточка удалялась
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    cardElement.remove(); // Удаление карточки из DOM
  });

  return cardElement; // Возвращаем готовую карточку для дальнейшего использования
}

// @todo: Функция создания карточки
// Функция для добавления карточки в контейнер на странице
function renderCard(cardData, container){
  const card = createCard(cardData); // Создаем карточку
  container.appendChild(card); // Добавляем карточку в контейнер
}

// @todo: Вывести карточки на страницу
// Выводим карточки на страницу
const placesList = document.querySelector('.places__list'); // Находим контейнер для карточек
initialCards.forEach((cardData) => {
  renderCard(cardData, placesList); // Для каждой карточки из начального списка создаем и выводим карточку на страницу
});
