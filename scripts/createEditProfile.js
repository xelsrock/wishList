import { API_URL } from "./const.js";
import { createElement, createSelectDate, handleImageFileSelection } from "./helper.js";
import { router } from "./index.js";
import { getUser, sendDataUser } from "./service.js";

export const createEditProfile = async (login) => {
  const user = await getUser(login);

  const sectionEditProfile = createElement('section', {
    className: 'edit edit_profile',
  });

  const container = createElement('div', {
    className: 'container',
  });

  sectionEditProfile.append(container);

  const formProfile = createElement('form', {
    className: 'edit__form',
  });

  formProfile.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (data.day && data.month && data.year) {
      data.birthdate = `${data.month}/${data.day}/${data.year}`;
    }

    await sendDataUser(user.id, data);
    router.setRoute(`/user/${login}`);
  }); 

  const editAvatar = createElement('fieldset', {
    className: 'edit__avatar',
  });

  const editAvatarImage = createElement('img', {
    className: 'edit__avatar-img',
    src: `${API_URL}/${user.avatar}`,
    alt: `Аватар ${user.login}`,
  });

  const editAvatarLoad = createElement('div', {
    className: 'edit__avatar-load',
  });

  const editLabelAvatar = createElement('label', {
    className: 'edit__label-avatar',
    htmlFor: 'avatar-load',
    innerHTML: `
      <svg class="edit__icon-avatar" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.75 33.25H10.6875L28.1992 15.7384L22.2617 9.80086L4.75 27.3125V33.25ZM7.91667 28.6267L22.2617 14.2817L23.7183 15.7384L9.37333 30.0834H7.91667V28.6267ZM29.0858 5.20919C28.9394 5.06241 28.7654 4.94596 28.5738 4.86651C28.3823 4.78705 28.177 4.74615 27.9696 4.74615C27.7622 4.74615 27.5569 4.78705 27.3653 4.86651C27.1738 4.94596 26.9998 5.06241 26.8533 5.20919L23.9558 8.10669L29.8933 14.0442L32.7908 11.1467C32.9376 11.0002 33.0541 10.8262 33.1335 10.6347C33.213 10.4431 33.2539 10.2378 33.2539 10.0304C33.2539 9.82307 33.213 9.61774 33.1335 9.4262C33.0541 9.23466 32.9376 9.06067 32.7908 8.91419L29.0858 5.20919Z" fill="white"/>
      </svg>
      <span>Обновить фотографию</span>
    `,
  });

  const editInputFile = createElement('input', {
    className: 'edit__input-file edit__input-file_avatar',
    type: 'file',
    id: 'avatar-load',
    accept: 'image/jpeg, image/png',
  });

  const editHiddenInput = createElement('input', {
    type: 'hidden',
    name: 'avatar',
  });

  handleImageFileSelection(editInputFile, editAvatarImage, editHiddenInput);

  const editAvatarDelete = createElement('button', {
    className: 'edit__avatar-delete',
    type: 'button',
    innerHTML: `
      <svg class="edit__icon-avatar" width="38" height="38" viewBox="0 0 23 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.48842 25.6389C2.48842 27.35 3.90271 28.75 5.63128 28.75H18.2027C19.9313 28.75 21.3456 27.35 21.3456 25.6389V6.97222H2.48842V25.6389ZM5.63128 10.0833H18.2027V25.6389H5.63128V10.0833ZM17.417 2.30556L15.8456 0.75H7.98842L6.41699 2.30556H0.916992V5.41667H22.917V2.30556H17.417Z" fill="white"/>
      </svg>
      <span>Удалить</span>
    `,
  });

  editAvatarDelete.addEventListener('click', () => {
    editInputFile.value = '';
    editAvatarImage.src = 'img/avatar.png';
  });

  editAvatarLoad.append(editLabelAvatar, editInputFile, editHiddenInput, editAvatarDelete);
  editAvatar.append(editAvatarImage, editAvatarLoad);
  container.append(formProfile);

  const editName = createElement('fieldset', {
    className: 'edit__name',
  });

  const editNameLabel = createElement('label', {
    className: 'edit__label',
    innerHTML: '<span class="edit__label-text">Имя:</span>',
  });

  const editNameInput = createElement('input', {
    className: 'edit__input', 
    type: 'text',
    name: 'name',
    value: user.name || '',
  });

  editNameLabel.append(editNameInput);

  const editSurnameLabel = createElement('label', {
    className: 'edit__label',
    innerHTML: '<span class="edit__label-text">Имя:</span>',
  });

  const editSurnameInput = createElement('input', {
    className: 'edit__input', 
    type: 'text',
    name: 'surname',
    value: user.surname || '',
  });
  
  editSurnameLabel.append(editSurnameInput);

  editName.append(editNameLabel, editSurnameLabel);

  const editBirthday = createElement('fieldset', {
    className: 'edit__birthday',
  });

  const editBirthdayLabel = createElement('legend', {
    className: 'edit__label edit__label-text',
    textContent: 'Дата рождения:',
  });

  const editBirthdayWrapper = createElement('div', {
    className: 'edit__birthday-wrapper',
  });

  editBirthday.append(editBirthdayLabel, editBirthdayWrapper);

  const editBirthdayLabelDay = createElement('label', {
    className: 'edit__label edit__label_select',
  });

  const editBirthdaySelectDay = createElement('select', {
    className: 'edit__select',
    name: 'day',
  });

  editBirthdayLabelDay.append(editBirthdaySelectDay);

  const editBirthdayLabelMonth = createElement('label', {
    className: 'edit__label edit__label_select',
  });

  const editBirthdaySelectMonth = createElement('select', {
    className: 'edit__select',
    name: 'month',
  });

  editBirthdayLabelMonth.append(editBirthdaySelectMonth);

  const editBirthdayLabelYear = createElement('label', {
    className: 'edit__label edit__label_select',
  });

  const editBirthdaySelectYear = createElement('select', {
    className: 'edit__select',
    name: 'year',
  });

  editBirthdayLabelYear.append(editBirthdaySelectYear);

  createSelectDate(
    editBirthdaySelectDay,
    editBirthdaySelectMonth,
    editBirthdaySelectYear,
    user.birthdate
  );

  editBirthdayWrapper.append(
    editBirthdayLabelDay, 
    editBirthdayLabelMonth, 
    editBirthdayLabelYear
  );

  const editDescription = createElement('fieldset', {
    className: 'edit__description',
  });

  const editDescriptionLabel = createElement('label', {
    className: 'edit__label-text',
    htmlFor: 'description',
    textContent: 'Вступительный текст:',
  });

  const editDescriptionTextarea = createElement('textarea', {
    className: 'edit__description-input',
    id: 'description',
    name: 'description',
    value: user.description ?? '',
  });

  const editSubmitBtn = createElement('button', {
    className: 'edit__submit btn',
    textContent: 'Сохранить изменения',
    type: 'submit',
  });
 
  editDescription.append(editDescriptionLabel, editDescriptionTextarea);

  formProfile.append(
    editAvatar, 
    editName,
    editBirthday, 
    editDescription, 
    editSubmitBtn
  );

  container.append(formProfile);

  return { sectionEditProfile, formProfile };
};