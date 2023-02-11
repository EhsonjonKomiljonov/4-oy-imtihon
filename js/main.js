const elList = document.querySelector('.js-list');
const localData = localStorage.getItem('token');

if (!localData) {
  window.location.replace('login.html');
}

const getProducts = (arr, node) => {
  arr.forEach((el) => {
    node.innerHTML += `<div class="card" style="width: 18rem;">
          <img src="http://192.168.100.87:5000/${el.product_img}" class="card-img-top" alt="">
          <div class="card-body">
          <h5 class="card-title">${el.product_name}</h5>
          <p class="card-text mb-2">${el.product_desc}</p>
          <p class="card-text mb-2">Price: ${el.product_price}$</p>
          </div>
          </div>`;
  });
};

const renderProducts = (arr, node) => {
  fetch('http://192.168.100.87:5000/product', {
    method: 'GET',
    headers: {
      authorization: localData,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getProducts(data, elList);
      }
    })
    .catch((err) => console.log(err));
};

renderProducts();
