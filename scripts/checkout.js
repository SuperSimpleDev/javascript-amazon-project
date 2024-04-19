import { cart,removeFromCart,updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { updateCartQuantity } from "../data/cart.js";
document.querySelector('.js-return-to-home-link').innerHTML = `${updateCartQuantity()} items`;

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  console.log(products.length)
  // Find the product matching the cart item
  for (let i = 0; i < products.length; i++) {
    if (productId === products[i].id) {
      matchingProduct = products[i];
      break;
    }
  }

  // Check if a matching product was found
  if (matchingProduct) {
    // Construct HTML for the cart item
    const cartItemHtml = `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id=${matchingProduct.id}>Update
              </span>
              <input class="quantity-input js-quantity-input-${matchingProduct.id}"  type="number">
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
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    `;

    // Append the HTML to the order summary element
    document.querySelector('.js-order-summary').innerHTML +=cartItemHtml;
    
  }
});

document.querySelectorAll('.js-delete-link')
.forEach((link) =>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    removeFromCart(productId);
    

    const container=document.querySelector(
      `.js-cart-item-container-${productId}`
      )
    container.remove();
    document.querySelector('.js-return-to-home-link').innerHTML = `${updateCartQuantity()} items`;

    
    
  });
});


document.querySelectorAll('.js-update-quantity-link')
.forEach((link) =>{
  link.addEventListener('click',()=>{
    const productId= link.dataset.productId;
    const cartItemContainer=document.querySelector(`.js-cart-item-container-${productId}`)
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
      if (quantityInput){
      const newQuantity = Number(quantityInput.value);
      console.log(newQuantity);
      updateQuantity(productId,newQuantity);
      document.querySelector(`.quantity-label-${productId}`).innerHTML=newQuantity;
      document.querySelector('.js-return-to-home-link').innerHTML = `${updateCartQuantity()} items`;
      }
  });
});



