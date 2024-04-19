export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
cart=[
  {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1
  },
  {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:2
  },
  {
    productId:"dd82ca78-a18b-4e2a-9250-31e67412f98d",
    quantity:6
  }
  ];
  
}

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

    savetoStorage();
  }
}

export function removeFromCart(productid){
  const newCart=[];
  
  cart.forEach((cartItem)=>{
    if (cartItem.productId !== productid){
      newCart.push(cartItem);
    };
});
  cart=newCart;
  savetoStorage();
}

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

