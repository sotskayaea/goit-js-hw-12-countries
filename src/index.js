import './sass/main.scss';
import markupCountry from './templates/countries-markup.hbs'
import countryList from './templates/country-list.hbs'
import API from './js/fetchCountries.js'
import getRefs from './js/get-refs.js'
import { debounce } from "debounce";
import pnotify from './js/pnotify';

const refs = getRefs();

refs.input.addEventListener('input', debounce(e => {
  onInputValue(e);
}, 500))

function onInputValue (e){
  e.preventDefault();
  const value = e.target.value;
  if (!value) {
    clearMarkup();
    return;
  }
  searchCountry(value);
}

function searchCountry (value){
  OnResetStyleCountryDiv()
  API.fetchCountry(value).then(country => {
    if(!country) {
      return;
    } else if (country.length > 10) {
      clearMarkup();
      const message = 'Найдено слишком много совпадений, уточните ваш запрос'
      pnotify({
        title: 'Ошибка',
        text: message,
      });
    } else if (country.length >= 2 && country.length <= 10) {
      createCountryListMarkup(country);
    } else if (country.length === 1) {
      onStyleCountryDiv();
      createMarkup(country);
    } else {
      pnotify({
        title: 'Ошибка',
        text: 'Некоректный запрос или такой страны нет в списке',
        delay: 500,
      });
    }
  })
}

function error(){
  console.log('error😱')
}

function createMarkup (country){
  const markup = markupCountry(country);
  refs.markup.innerHTML = markup;
}

function createCountryListMarkup(list){
  const markup = countryList(list);
  refs.markup.innerHTML = markup;
}

function clearMarkup(){
  refs.markup.innerHTML = '';
}
function onStyleCountryDiv (){
  refs.markupCountry.classList.add('opacity');
}
function OnResetStyleCountryDiv(){
  refs.markupCountry.classList.remove('opacity');
}