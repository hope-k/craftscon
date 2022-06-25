const detailAddToCartBtn = document.querySelector('#detail .add-to-cart-btn');
const increaseBtn = document.querySelector('.increase-btn');
const decreaseBtn = document.querySelector('.decrease-btn');
const qty = document.querySelector('.qty-num');
const cart = document.querySelector('.cart-number');
const addToCartBtn = document.querySelectorAll('#featured-products .featured-card .add-to-cart-btn');
const profileInputs = document.querySelectorAll('#profile .input');
const editBtn = document.querySelector('.edit-btn');
const userBtn = document.querySelector('.fa-user');
const userOptionElement = document.querySelector('.user-option');

userBtn.addEventListener('mouseenter', () => {
    userOptionElement.style.display = 'block';
});

document.addEventListener('click', () => {
    userOptionElement.style.display = 'none';
});


addToCartBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        storeCartItem(1);
    });
});

let enableInputFields = function() {
    profileInputs.forEach(input => {
        input.disabled = false;
    });
};

editBtn.addEventListener('click', enableInputFields);

let increaseQty = function() {
    qty.textContent = parseInt(qty.textContent) + 1;
};

let decreaseQty = function() {
    if (parseInt(qty.textContent) > 0) {
        qty.textContent = parseInt(qty.textContent - 1);
    } else if(parseInt(qty.textContent) <= 0) {
        qty.textContent = 0;
    }
};

let storeCartItem = function(qty) {
    cart.textContent = parseInt(cart.textContent) + parseInt(qty);
    localStorage.setItem('cart', cart.textContent);
    return localStorage.getItem('cart');
};

let detailQty = function() {
    return qty.textContent;
};


let detailAddToCart = function() {
    storeCartItem(detailQty());
};


if (localStorage.getItem('cart')) {
    cart.textContent = localStorage.getItem('cart');
} else {
    cart.textContent = 0;
}


increaseBtn.addEventListener('click', increaseQty);
decreaseBtn.addEventListener('click', decreaseQty);
detailAddToCartBtn.addEventListener('click', detailAddToCart);