const elForm = document.querySelector('.js-form2');
const elNameInput = document.querySelector('.js-name');
const elPhoneInput = document.querySelector('.js-phone');
const elEmailInput = document.querySelector('.js-email');
const elPasswordInput = document.querySelector('.js-password');
const elEyeBtn = document.querySelector('.js-eye');

elEyeBtn.addEventListener('click', () => {
  if (elPasswordInput.type === 'password') {
    elPasswordInput.type = 'text';
  } else {
    elPasswordInput.type = 'password';
  }
});

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  fetch('http://localhost:5000/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: elNameInput.value,
      phone: elPhoneInput.value,
      email: elEmailInput.value,
      password: elPasswordInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.replace('index.html');
      }
    })
    .catch((err) => console.log(err));
});
