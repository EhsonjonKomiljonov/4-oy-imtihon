const elList = document.querySelector('.js-list');
const elForm = document.querySelector('.admin-form');
const elProductName = document.querySelector('.product-name');
const elProductDesc = document.querySelector('.product-desc');
const elProductPrice = document.querySelector('.product-price');
const elProductImageInput = document.querySelector('.product-image');

const localData = localStorage.getItem('token');

if (!localData) {
  window.location.replace('login.html');
}

const renderProducts = (arr, node) => {
  node.innerHTML = '';
  arr.forEach((el) => {
    node.innerHTML += `
    <div class="card" style="width: 18rem;">
    <img src="http://192.168.100.87:5000/${el.product_img}" class="card-img-top" alt="">
    <div class="card-body">
    <h5 class="card-title">${el.product_name}</h5>
    <p class="card-text mb-2">${el.product_desc}</p>
    <p class="card-text mb-2">Price: ${el.product_price}$</p>
    <button data-product-id="${el.id}" class="btn btn-warning product-edit me-2" >Edit</button>
      <button data-product-id="${el.id}" class="btn btn-danger product-delete" >Delete</button>
    </div>
    </div>`;
  });
};

const getProducts = async () => {
  const response = await fetch('http://192.168.100.87:5000/product', {
    headers: {
      authorization: localData,
    },
  });
  const data = await response.json();
  renderProducts(data, elList);
};

getProducts();

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData();

  formData.set('product_img', elProductImageInput.files[0]);
  formData.set('product_name', elProductName.value);
  formData.set('product_desc', elProductDesc.value);
  formData.set('product_price', elProductPrice.value);

  fetch('http://192.168.100.87:5000/product', {
    method: 'POST',
    headers: {
      authorization: localData,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getProducts();
      }
    })
    .catch((err) => console.log(err));
});

// DELETE PRODUCTS

const deleteProduct = async (id) => {
  const response = await fetch(`http://192.168.100.87:5000/product/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: localData,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getProducts();
      }
    })
    .catch((err) => console.log(err));
};

// EDIT PRODUCTS

const elEditForm = document.querySelector('.admin-edit-form');
const elProductEditName = document.querySelector('.product-edit-name');
const elProductEditDesc = document.querySelector('.product-edit-desc');
const elProductEditPrice = document.querySelector('.product-edit-price');
const elProductEditImageInput = document.querySelector('.product-edit-image');

const editProducts = (id) => {
  const formData = new FormData();

  formData.set('product_name', elProductEditName.value);
  formData.set('product_desc', elProductEditDesc.value);
  formData.set('product_img', elProductEditImageInput.files[0]);
  formData.set('product_price', elProductEditPrice.value);

  fetch(`http://192.168.100.87:5000/product/${id}`, {
    method: 'PUT',
    headers: {
      authorization: localData,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getProducts();
        console.log(data);
      }
    })
    .catch((err) => console.log(err));
};

elList.addEventListener('click', (evt) => {
  if (evt.target.matches('.product-delete')) {
    const productId = evt.target.dataset.productId;
    deleteProduct(productId);
  }
  if (evt.target.matches('.product-edit')) {
    const productId = evt.target.dataset.productId;

    elEditForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      editProducts(productId);
    });

    document.body.classList.add('edit-modal');
    document.body.style.overflow = 'hidden';
  }
});

//================================================== ADD MODAL

const openModal = () => {
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  document.body.classList.remove('modal-open');
};

// =============================================== EDIT MODAL

const closeEditModal = () => {
  document.body.classList.remove('edit-modal');
  document.body.style.overflow = 'auto';
};
