const elForm = document.querySelector('.js-form');
const elEmailInput = document.querySelector('.js-email');
const elPasswordInput = document.querySelector('.js-password');
const elBtn = document.querySelector('.js-eye');

elBtn.addEventListener('click', () => {
  if (elPasswordInput.type === 'password') {
    elPasswordInput.type = 'text';
  } else {
    elPasswordInput.type = 'password';
  }
});

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  fetch('http://localhost:5000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: elEmailInput.value,
      password: elPasswordInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.replace('index.html');
      }
    })
    .catch((err) => console.log(err));
});
