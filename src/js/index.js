import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';

const searchBox = document.getElementById('search-box');
const countryList = document.getElementById('country-list');

searchBox.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  const query = event.target.value.trim();
  
  if (query === '') {
    clearCountryList();
    return;
  }
  
  fetchCountries(query)
    .then(countries => {
      clearCountryList();
      if (countries.length === 1) {
        renderCountryDetail(countries[0]);
      } else {
        renderCountryList(countries);
      }
    })
    .catch(error => {
      console.error(error);
      clearCountryList();
    });
}

function clearCountryList() {
  countryList.innerHTML = '';
}

function renderCountryList(countries) {
  const items = countries.map(country => `<li>${country.name}</li>`).join('');
  countryList.innerHTML = items;
}

function renderCountryDetail(country) {
  const detail = `
    <li>
      <h2>${country.name}</h2>
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population}</p>
      <img src="${country.flag}" alt="Flag of ${country.name}" width="100">
    </li>
  `;
  countryList.innerHTML = detail;
}
