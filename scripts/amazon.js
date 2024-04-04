import { cart } from "../data/cart.js";

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `<div class="product-container">
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
    $${(product.priceCents / 100).toFixed(2)}
  </div>

  <div class="product-quantity-container">
    <select>
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

          <div class="added-to-cart js-added-to-cart-${product.id}">
            
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
  // document.querySelector('products-grid').innerHTML+=html

})
document.querySelector('.js-products-grid').innerHTML += productsHTML;
// Change const to let

let CartQuantity = 0; // Change const to let

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    let index = -1;

    const productId = button.dataset.productId;
    cart.forEach((item, i) => {
      if (productId === item.productId) {
        index = i;
      }

    });

    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1
      });

      addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
      addedToCart.innerHTML = `<img src="images/icons/checkmark.png"> Added`;
      setTimeout(function () {
        addedToCart.innerHTML = "";
      }, 1300);

    }

    // Update CartQuantity here
    CartQuantity = 0;
    cart.forEach((item) => {
      CartQuantity += item.quantity;
    });
    // Update cart quantity display
    document.querySelector('.js-cart-quantity').innerHTML = CartQuantity;

  });

});
