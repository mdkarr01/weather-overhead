const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const errorMessage = document.querySelector('#error');
const forecastMessage = document.querySelector('#forecast');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const location = search.value;

  errorMessage.textContent = 'Loading...';
  errorMessage.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
    res.json().then(data => {
      if (data.error) {
        errorMessage.textContent = data.error;
      } else {
        forecastMessage.textContent = `The forecast for ${data.location} will be ${data.forecast}`;
        // console.log(data.forecast);
        // console.log(data.location);
      }
    });
  });
});
