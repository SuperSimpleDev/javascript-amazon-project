import { cart, removeFromCart, updateQuantity, updateDeliveryOption}
from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../scripts/utils/money.js";
import { updateCartQuantity } from "../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

export function renderOrderSummary(){
  

  document.querySelector('.js-return-to-home-link').innerHTML = `${updateCartQuantity()} items`;

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    
    // Find the product matching the cart item
    for (let i = 0; i < products.length; i++) {
      if (productId === products[i].id) {
        matchingProduct = products[i];
        break;
      }
    }

    // Check if a matching product was found
    if (matchingProduct) {
      const deliveryOptionId = cartItem.deliveryOptionId;

      let deliveryOption;

      deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
          deliveryOption = option;

        }
      });
      const today = dayjs();
      const delivaryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      )
      const dateString = delivaryDate.format('dddd, MMMM D');


      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      // Construct HTML for the cart item
      const cartItemHtml = `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">${matchingProduct.getPrice()}</div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id=${matchingProduct.id}>Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" min="1" max="10" value="1">
                <span class="save-quantity-link 
                js-save-quantity-link link-primary "data-product-id=${matchingProduct.id}>Save</span>
                <span class="delete-quantity-link js-delete-link link-primary" data-product-id=${matchingProduct.id}>Delete</span>
              </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(matchingProduct, cartItem)}
          </div>
        </div>
      `;

      // Append the HTML to the order summary element
      document.querySelector('.js-order-summary').innerHTML += cartItemHtml;

    }
  });
  function deliveryOptionsHtml(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const delivaryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      )
      const dateString = delivaryDate.format('dddd,MMMM D');
      const priceString = deliveryOption.priceCents === 0
        ? `FREE `
        : `$${formatCurrency(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option" 
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
    <input type="radio" 

    class="delivery-option-input" name="delivery-option-${matchingProduct.id}"  ${isChecked ? 'checked' : ''}>
    <label for="delivery-option-${matchingProduct.id}">
        <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString}Shipping</div>
        </div>
    </label>
  </div>

  `

    });
    return html;

  }
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);


        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        )
        container.remove();
        document.querySelector('.js-return-to-home-link').innerHTML = `${updateCartQuantity()} items`;


        location.reload();
      });
    });


  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`)
        cartItemContainer.classList.add('is-editing-quantity');
        // console.log(cartItemContainer);
        

      });
      
    });

  document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      // Get the product ID from the clicked link's data attribute
      const productId = link.dataset.productId;

      // Find the cart-item-container for the product
      const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);

      cartItemContainer.classList.remove('is-editing-quantity');
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      if (quantityInput) {
        const newQuantity = Number(quantityInput.value);
        console.log(newQuantity);
        updateQuantity(productId, newQuantity);
        document.querySelector(`.quantity-label-${productId}`).innerHTML = newQuantity;
        document.querySelector('.js-return-to-home-link').innerHTML = `${updateCartQuantity()} items`;
      }
      location.reload();
    });
  });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        location.reload();
      });

    });

}

