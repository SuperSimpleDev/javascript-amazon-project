import { cart,removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
console.log(cart)
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
      <div class="cart-item-container">
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
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">Update</span>
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
    console.log(cart);
  });
});
