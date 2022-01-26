console.log('client side JavaScript was called!!');

const weatherForm = document.querySelector('form');
const cityInput = document.querySelector('input').value;

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/weather?address=${cityInput}`).then(
        (response) => {
            response.json().then((data) => {
                if (data.error) {
                    document.querySelector('#error').textContent = data.error;
                }
                document.querySelector(
                    '#data'
                ).textContent = `${data.location}.\n\n ${data.forecast}`;
                document.querySelector('#error').style.display = 'none';
            });
        }
    );
});