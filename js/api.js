
const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/data';
const PATH = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const METHOD = {
  GET: 'GET',
  POST: 'POST',
};
const error = {
  GET_DATA: 'Не удалось получить данные',
  SEND_DATA: 'Не удалось отправить данные.',
};
const load = (route, errorTxt, method = METHOD.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorTxt);
    });
export const getData = () => load(PATH.GET_DATA, error.GET_DATA);
export const sendData = (body) => load(PATH.SEND_DATA, error.SEND_DATA, METHOD.POST, body);
