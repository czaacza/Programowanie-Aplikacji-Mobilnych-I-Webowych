continentButtons = document.querySelectorAll('.continent-btn');

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
        displayCountries(data);
        setCountryButtonListeners();
      })
      .catch(function (err) {
        console.log(err);
      });
  });
});

function displayCountries(countries) {
  const container = document.querySelector('#countries-container');
  container.innerHTML = '';

  const title = document.getElementById('countries-title');

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
          displayCountries(data);
          console.log(data);
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  });
};
