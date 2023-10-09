continentButtons = document.querySelectorAll('.continent-btn');

continentButtons.forEach(function (button) {
  // Add event listener to each button
  button.addEventListener('click', function () {
    value = button.getAttributeNode('value').value;
    // create an api get request to get the data from a sample url
    const url = `http://dataservice.accuweather.com/locations/v1/countries/${value}?apikey=dvT5HgUQ1B4sARqRSNudKCWvZOVRxHjy&language=en-us`;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Use the data to update the page
        console.log(data);
        displayCountries(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
});

function displayCountries(countries) {
  const container = document.querySelector('#countries-container');

  countries.forEach((country) => {
    const card = document.createElement('div');
    card.className = 'card';

    const cardText = document.createElement('p');
    cardText.innerText = country.EnglishName;

    card.appendChild(cardText);
    container.appendChild(card);
  });
}
