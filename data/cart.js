export let cart = [];

export function addedToCart(productId) {
  let index = -1;
  cart.forEach((cartItem, i) => {
    if (productId === cartItem.productId) {
      index = i;
    }

  });
  const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);

  if (addedToCart) {
    addedToCart.innerHTML = `<img src="images/icons/checkmark.png"> Added`;
    setTimeout(function () {
      addedToCart.innerHTML = "";
    }, 1300);
  }
  else {
    console.error("Element with class 'js-added-to-cart' not found.");
  }
  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });


  }
}



