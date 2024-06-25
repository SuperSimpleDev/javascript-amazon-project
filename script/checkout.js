import { cart,removeFromCart,
  calculateCartQuantity,
  updateQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions} from '../data/deliveryOptions.js';
let cartSummaryHtml = '';
cart.forEach((cartItem)=>{
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product)=>{
    if(product.id === productId){
      matchingProduct = product;
    } 
  });
  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption = '';
  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });
  const dateString = dayjs().add(1,'days').format('dddd, MMMM D');
  cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>
      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">
        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link js-update-link link-primary" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input type = number ; class = "quantity-input js-quantity-input-${matchingProduct.id}"></input>
            <span class = "save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct,cartItem)}
        </div>
      </div>
    </div>`
});
function deliveryOptionsHTML(matchingProduct,cartItem){
  let html = '';
  deliveryOptions.forEach((option) => {
    const dateString = dayjs().add(option.deliveryDays,'days').format('dddd, MMMM D');
    const priceString = option.priceCents === 0?'FREE':`$${formatCurrency(option.priceCents)} `;
    const isChecked = option.id === cartItem.deliveryOptionsId;
    html += `
    <div class="delivery-option">
      <input type="radio"
      ${isChecked?'checked':''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
         ${dateString}
        </div>
        <div class="delivery-option-price">
        ${priceString} Shipping
        </div>
      </div>
    </div>
    `
  });
  return html;
};
document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;
document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
  const {productId} = link.dataset;
  removeFromCart(productId);  
  const container = document.querySelector(`.js-cart-item-container-${productId}`);
  container.remove();
  updateCartQuantity();
  });
});
updateCartQuantity();
function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();
document.querySelector('.js-return-to-home-link').innerHTML =`${cartQuantity} items`;
};
document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click',()=>{
  const {productId} = link.dataset;
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    });
  });
  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click',() => {
      const {productId} = link.dataset;
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);
      if(newQuantity < 0 || newQuantity >= 1000){
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
      updateQuantity(productId,newQuantity);
      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
      quantityLabel.innerHTML = newQuantity;
  });
});
