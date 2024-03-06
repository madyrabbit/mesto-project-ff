// Функция для создания новой карточки на основе данных карточки
function createCard(cardData, deleteCardCallback){
  // Получаем доступ к содержимому шаблона карточки в HTML по его идентификатору и создаем копию элемента карточки для заполнения данными
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  // Устанавливаем атрибуты изображения карточки (ссылку и альтернативный текст) на основе данных карточки
  cardElement.querySelector('.card__image').src = cardData.link; // Установка ссылки на изображение
  cardElement.querySelector('.card__image').alt = cardData.name; // Установка альтернативного текста изображения
  // Устанавливаем название карточки на основе данных карточки
  cardElement.querySelector('.card__title').textContent = cardData.name; // Установка названия места

  // Добавляем обработчик события клика на кнопку удаления карточки, чтобы при клике карточка удалялась
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    deleteCardCallback(cardElement); // Вызов функции-колбэка для удаления карточки
  });

  return cardElement; // Возвращаем готовую карточку для дальнейшего использования
}

// Функция для добавления карточки в контейнер на странице
function renderCard(cardData, container){
  const card = createCard(cardData, function(cardElement) {
    cardElement.remove(); // Удаление карточки из DOM
  }); // Создаем карточку с передачей колбэка для удаления
  container.appendChild(card); // Добавляем карточку в контейнер
}

// Выводим карточки на страницу
const placesList = document.querySelector('.places__list'); // Находим контейнер для карточек
initialCards.forEach((cardData) => {
  renderCard(cardData, placesList); // Для каждой карточки из начального списка создаем и выводим карточку на страницу
});
