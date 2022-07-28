import './sass/main.scss';
import pnotify from './js/pnotify';
import NewApi from './js/fetchCountries.js';
import countryCard from './templates/countryCard.hbs';
import listCountries from './templates/list.hbs';
import debounce from 'lodash.debounce';


const refs = {
    input : document.querySelector('.input'),
    markup : document.querySelector('.markup-country')
}

const api = new NewApi();

refs.input.addEventListener('input', debounce(onSearchCountry, 500))

function onSearchCountry(e){
    e.preventDefault();
    const value = e.target.value;
    if(!value){
        onClearMarkup();
        return  
    }
    
    onFindCountry(value);
    onClearMarkup();

}

function onFindCountry(value){
    api.fetchCountries(value).then(query => {
        if (!query){
            return
        } else if (query.lenght > 10){
            onClearMarkup();
            const message = 'Найдено слишком много совпадений, уточните ваш запрос'
      pnotify({
        title: 'Ошибка',
        text: message,
        delay:1000,
      });
    } else if (query.length >= 2 && query.length <= 10) {
        onMakeListCountry(query);
      } else if (query.length === 1) {
        onClearMarkup();
        onMakeCountryCard(query);
      } else {
        pnotify({
          title: 'Ошибка',
          text: 'Некоректный запрос или такой страны нет в списке',
          delay: 1000,
        });
      }
    }).catch(error => {
      onError();
    });

}
  
  function onError(){
    pnotify({
      title: 'Критическая ошибка',
      text: 'Что-то пошло не так.',
      delay: 500,
    });
} 

function onMakeListCountry(query){
    const list = listCountries(query);
    refs.markup.innerHTML = list; 

}

function onMakeCountryCard(query){
    const card = countryCard(query);
    refs.markup.innerHTML = card;

}

function onClearMarkup(){
    refs.markup.innerHTML = '';
}
