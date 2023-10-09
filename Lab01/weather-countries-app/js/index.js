const setSearchFormListener = function () {
  const searchForm = document.querySelector('.search-container form');
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchInput = document.querySelector('.search-container input');
    const searchValue = searchInput.value;
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=dvT5HgUQ1B4sARqRSNudKCWvZOVRxHjy&q=${searchValue}`;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Use the data to update the page
        console.log(data);
        displaySearchResults(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};

const setContinentButtonListeners = function () {
  continentButtons = document.querySelectorAll('.continent-btn');
  console.log(continentButtons);
  continentButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      value = button.getAttributeNode('value').value;
      const url = `http://dataservice.accuweather.com/locations/v1/countries/${value}?apikey=dvT5HgUQ1B4sARqRSNudKCWvZOVRxHjy&language=en-us`;
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          // Use the data to update the page
          console.log(data);
          displayCountries('country', data);
          setCountryButtonListeners();
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  });
};

const setCountryButtonListeners = function () {
  countryButtons = document.querySelectorAll('.country-btn');

  countryButtons.forEach(function (button) {
    // send a get request to get the data from a sample url
    button.addEventListener('click', function () {
      value = button.getAttributeNode('value').value;
      const url = `http://dataservice.accuweather.com/locations/v1/adminareas/${value}?apikey=dvT5HgUQ1B4sARqRSNudKCWvZOVRxHjy`;
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          displayCountries('region', data);
          console.log(data);
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  });
};

function displayCountries(title, countries) {
  const container = document.querySelector('#countries-container');
  container.innerHTML = '';

  const countriesTitle = document.getElementById('countries-title');
  countriesTitle.classList.remove('hidden');
  countriesTitle.innerText = `Choose your ${title}`;

  countries.forEach((country) => {
    const card = document.createElement('div');
    card.setAttribute('value', country.ID);

    card.className = 'card';
    card.classList.add('country-btn');

    const cardText = document.createElement('p');
    cardText.innerText = country.EnglishName;

    card.appendChild(cardText);
    container.appendChild(card);
  });
}

function displaySearchResults(results) {
  const container = document.querySelector('#countries-container');
  container.innerHTML = '';

  const countriesTitle = document.getElementById('countries-title');
  countriesTitle.classList.remove('hidden');
  countriesTitle.innerText = `Search Results`;

  results.forEach((result) => {
    const card = document.createElement('div');
    card.setAttribute('value', result.Key);

    card.className = 'card';
    card.classList.add('country-btn');

    const cardText = document.createElement('p');
    cardText.innerText = result.LocalizedName;

    card.appendChild(cardText);
    container.appendChild(card);
  });
}

setContinentButtonListeners();
setSearchFormListener();
