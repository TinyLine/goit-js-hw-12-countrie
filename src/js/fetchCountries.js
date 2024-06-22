const BASE_URL = 'https://restcountries.com/v2/name';

export default function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/${searchQuery}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 404) {
        return [];
      }
      return data;
    });
}
