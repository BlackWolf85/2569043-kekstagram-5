import {isKeyEsc} from './util.js';
import {reset} from './effects-image.js';
const maxTagsCount = 5;
const tagsRule = /^#[a-za-яё0-9]{1,19}$/i;
const tagError = 'Не верно введены хэштеги';
const form = document.querySelector('.img-upload__form');
const submitBtn = form.querySelector('.img-upload__submit');
const tagsField = document.querySelector('.text__hashtags');
const commField = document.querySelector('.text__description');
const file = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('.body');
const cancelBtn = document.querySelector('#upload-cancel');
const success = document.querySelector('#success').content.querySelector('.success');
const successBtn = document.querySelector('#success').content.querySelector('.success__button');
const error = document.querySelector('#error').content.querySelector('.error');
const errorBtn = document.querySelector('#error').content.querySelector('.error__button');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});
const openModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};
const closeModal = () => {
  form.reset();
  reset();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};
const ifInTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;
function onDocumentKeydown(evt) {
  if (isKeyEsc(evt) && !ifInTextFieldFocused()) {
    evt.preventDefault();
    const hasHiddenPopup = document.querySelector('.error');
    if (!hasHiddenPopup) {
      closeModal();
    }
  }
}
const cancelBtnClick = () => {
  closeModal();
};
const inputChange = () => {
  openModal();
};
const isValidTag = (tag) => tagsRule.test(tag);
const tagsValidCount = (tags) => tags.lenth <= maxTagsCount;
const uniqueTags = (tags) => {
  const lowerCaseT = tags.map((tag) => tag.toLowerCase());
  return lowerCaseT.lenth === new Set(lowerCaseT).size;
};
const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return tagsValidCount(tags) && uniqueTags(tags) && tags.every(isValidTag);
};
pristine.addValidator(tagsField, validateTags, tagError);
const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};
file.addEventListener('change', inputChange);
cancelBtn.addEventListener('click', cancelBtnClick);
form.addEventListener('submit', onFormSubmit);
