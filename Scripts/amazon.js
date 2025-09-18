import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">  
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-cart-add-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary 
          js-add-to-cart"
          data-product-id="${product.id}"> 
            Add to Cart
          </button>
        </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

//object for timeout reset
const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    //data attribute saves data of any element from HTML
    //.dataset helps to get that element
    //product-name changes to productId while fetching in this case
    const {productId} = button.dataset;          //id to make objects having same name unique

    //getting selected value for cart
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const selectedQuantity = Number(quantitySelector.value);


    let matchingItem;
    cart.forEach((item) => {

      if (productId === item.productId) {             
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity +=selectedQuantity;
    } else {
      cart.push({productId, 
      quantity: selectedQuantity});
    }

  //to make cart button interactive
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  
  //to show the item added message
  const addedMessage = document.querySelector(`.js-cart-add-${productId}`);
  addedMessage.classList.add('added-to-cart-2');
  if (addedMessageTimeouts[productId]) {
    clearTimeout(addedMessageTimeouts[productId]);
  }
  addedMessageTimeouts[productId] = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-2');
    delete addedMessageTimeouts[productId];
  }, 2000);
  });
});