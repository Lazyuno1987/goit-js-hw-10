import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));
const countryList = document.querySelector('.country-list');
const countryContejner = document.querySelector('.country-info');

function onInputSearch(ev) {
  onClearInput();
  const input = ev.target.value.trim();
  fetchCountries(input).then(response => {
    if (response.length === 1) {
      countryCardRender(response);
    }
    if (response.length >= 2 && response.length <= 10) {
      countryListRender(response);
    }
    if (response.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
    }
  });
}

function onClearInput() {
  countryList.innerHTML = '';
  countryContejner.innerHTML = '';
}

function countryCardRender(response) {
  const markup = response
    .map(element => {
      return `<div class="item"><img class="img" src="${
        element.flags.svg
      }" width=50 alt="flag"><h1 class = "title">${
        element.name.official
      }</h1></div><p class="text"><b>Capital:</b> ${element.capital}</p>
<p class="text"><b>Population:</b> ${element.population}</p>
<p class="text"><b>Languages:</b> ${Object.values(element.languages)}</p>`;
    })
    .join('');
  countryContejner.innerHTML = markup;
}

function countryListRender(response) {
  const markup = response
    .map(element => {
      return `<li class="item"><img class="img" src="${element.flags.svg}"  width=30 alt="flag"><h3 class = "title">${element.name.official}</h3></li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
