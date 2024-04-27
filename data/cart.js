export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

<<<<<<< HEAD
export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
=======
function savetoStorage(){
  
  localStorage.setItem('cart',JSON.stringify(cart));


}

export function updateCartQuantity() {
  let CartQuantity = 0;
  
  cart.forEach((cartItem) => {
    CartQuantity += cartItem.quantity;
  });
  // Update cart quantity display
  return CartQuantity;
  

}

export function updateQuantity(productId,newQuantity){
  for (let i=0;i<cart.length;i++){
    if (cart[i].productId===productId){
      cart[i].quantity=newQuantity;
      break;
    }
  }
  savetoStorage();
}

<<<<<<< HEAD
>>>>>>> parent of 4012412 (make delivery options interactive)
=======
>>>>>>> parent of 4012412 (make delivery options interactive)
