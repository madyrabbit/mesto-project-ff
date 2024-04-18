import '../pages/index.css'
import { createCard } from '../components/card.js';
import { openModal, closeModal, closeModalClickOverlay } from '../components/modal.js';
import { enableValidation } from '../components/validation.js';
import { getUserInfo, getCardList, sendNewCardServer, sendUserProfile, deleteCard, changeAvatar, addLike, deleteLike } from '../components/api.js';

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardUrl = document.querySelector('.popup__input_type_url');
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElement = document.querySelector('.popup__form')
const popupWindowButtonEdit = formElement.querySelector('.popup__button');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const profileImage = document.querySelector('.profile__image');
const defaultNameInput = document.querySelector('.profile__title');
const defaultJobInput = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const newPlaceForms = document.forms['new-place'];
const newPlaceFormsButtonEdit = newPlaceForms.querySelector('.popup__button');

const popupDel = document.querySelector('.popup_delete');
const popupDelButtonEdit = popupDel.querySelector('.popup__button');

const popupTypeUpdateYourAvatar = document.querySelector('.popup_type_update_user_avatar');
const buttonSavinguserAvatar = popupTypeUpdateYourAvatar.querySelector('.popup__button');
const userAvatar = popupTypeUpdateYourAvatar.querySelector('.popup__update_user_avatar');

let userId = null;
let cardIds = null;

Promise.all([getUserInfo()])
  .then(([userData]) => {
    const userName = defaultNameInput.textContent = userData.name;
    const userAbout = defaultJobInput.textContent = userData.about;
    profileImage.style.backgroundImage = ('url(' + userData.avatar + ')');
    fillInProfileFormInputs(userName, userAbout);
  });

Promise.all([getCardList(), getUserInfo()])
  .then(([cards, userData]) => {
    userId = userData._id;
    cards.reverse().forEach((data) => {
      cardIds = data.owner._id;
      const cardElement = createCard(
        openModalImg,
        data,
        cardIds,
        userId
      );
      placesList.prepend(cardElement);
    });
  })
  .catch((err) => console.log(err));

// Кнопка созраниние новой карточки
function setAddCardFormSubmitListener() {
  newPlaceForms.addEventListener('submit', createNewPlaceCard);
}

// Создание новой карточки
function createNewPlaceCard(evt) {
  evt.preventDefault();

  const nameCard = cardName.value;
  const linkCard = cardUrl.value;

  loadingDataSaving(newPlaceFormsButtonEdit, true);

  sendNewCardServer(nameCard, linkCard).then((card) => {
    const newCardElement = createCard(
      openModalImg,
      card,
      cardIds,
      userId
    )
    placesList.prepend(newCardElement);
    cardName.value = '';
    cardUrl.value = '';
    closeModal(popupNewCard)
  })
    .catch((error) => {
      console.log('Возникла ошибка при отправке данных новой карточки на сервер', error);
    })
    .finally(() => loadingDataSaving(newPlaceFormsButtonEdit, false));
}
// Открытие модального окна с карточкой
function openModalImg(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(popupTypeImage);
}

// Закрытие popup по клику на крестик
function setEventListenersForClosingPopups() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    const buttonClosePopup = popup.querySelector('.popup__close')
    buttonClosePopup.addEventListener('click', () => closeModal(popup));
    popup.addEventListener('click', closeModalClickOverlay);
  });
}

// Редактирование информации профеля и закрытие модального окна
function submitEditProfileForm(evt) {
  evt.preventDefault();

  const valueFieldsNameInput = nameInput.value;
  const valueFieldsJobInput = jobInput.value;

  loadingDataSaving(popupWindowButtonEdit, true);

  sendUserProfile(valueFieldsNameInput, valueFieldsJobInput).then((res) => {
    defaultNameInput.textContent = res.name;
    defaultJobInput.textContent = res.about;
    closeModal(popupTypeEdit);
  })
    .catch((error) => console.log(error))
    .finally(() => loadingDataSaving(popupWindowButtonEdit, false))
}

// Обновления фота профиля
function updateAvatar() {
  let linkAvatar = userAvatar.value;

  loadingDataSaving(buttonSavinguserAvatar, true);

  changeAvatar(linkAvatar).then((res) => {
    profileImage.style.backgroundImage = ('url(' + res.avatar + ')');
    userAvatar.value = '';
    closeModal(popupTypeUpdateYourAvatar);
  })
    .catch((error) => console.log(error))
    .finally(() => loadingDataSaving(buttonSavinguserAvatar, false))
};

// открыть модальное окно с добавлением карточки
profileAddButton.addEventListener('click', () => {
  openModal(popupNewCard);
  enableValidation();
});

// Открытие модального окна с редоктированием профиля
profileEditButton.addEventListener('click', () => {
  openModal(popupTypeEdit);
  enableValidation();
});

editProfileForm.addEventListener('submit', submitEditProfileForm);

setAddCardFormSubmitListener();
setEventListenersForClosingPopups();

// Заполнение формы профиля
function fillInProfileFormInputs(NameInput, JobInput) {
  nameInput.value = NameInput;
  jobInput.value = JobInput;
}
fillInProfileFormInputs();

// Карточка которую хотим удалить
let card = {};

// Открытие модального окна с карточкой
export function openDeleteModalCard({ cardId, cardElement }) {
  card.cardId = cardId;
  card.cardElement = cardElement;
  openModal(popupDel);
};

// Установка слушателя на кнопку удаление карточки
popupDelButtonEdit.addEventListener('click', () => confirmDeleteCard());

// Удаление карточки
function confirmDeleteCard() {
  deleteCard(card.cardId).then(() => {
    card.cardElement.remove();
    closeModal(popupDel);
    card = {};
  });
};

export function toggleLikeCard(cardId, likeCardElement, cardLikeVolume) {
  const cardLike = likeCardElement.classList.contains('card__like-button_is-active');

  if (cardLike) {
    deleteLike(cardId)
  } else {
    addLike(cardId).then((res) => {
      console.log(res);
      if (cardLike) {
        likeCardElement.classList.remove('card__like-button_is-active');
      } else {
        likeCardElement.classList.add('card__like-button_is-active');
      }
      cardLikeVolume.textContent = res.likes.length;
    })
      .catch((error) => console.error('Ошибка лайка:', error));
  }
}

// Открытие модального окна с изменением картинки профиля
profileImage.addEventListener('click', () => {
  openModal(popupTypeUpdateYourAvatar);
  enableValidation();
});

buttonSavinguserAvatar.addEventListener('click', updateAvatar);

// Изменения текста кнопки сохранения профиля
const loadingDataSaving = (button, loading) => {
  if (loading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};