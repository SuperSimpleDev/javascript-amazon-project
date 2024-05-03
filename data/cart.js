export let cart ;
loadFromStorage();
export function loadFromStorage(){
  cart= JSON.parse(localStorage.getItem('cart'));

if(!cart){
cart=[
  {
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1,
    deliveryOptionId:'1'
  },
  {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:2,
    deliveryOptionId:'2'
  },
  {
    productId:"dd82ca78-a18b-4e2a-9250-31e67412f98d",
    quantity:6,
    deliveryOptionId:"1"
  }
  ];
  
}
}
export function addedToCart(productId) {
  // Find the index of the product in the cart based on its productId
  const index = cart.findIndex(cartItem => cartItem.productId === productId);

  // Get the element to show "Added" message
  const addedToCartElement = document.querySelector(`.js-added-to-cart-${productId}`);

  // If the element exists, display the checkmark and "Added" message
  if (addedToCartElement) {
      addedToCartElement.innerHTML = `<img src="images/icons/checkmark.png"> Added`;
      // Remove the message after 1.3 seconds
      setTimeout(() => {
          addedToCartElement.innerHTML = "";
      }, 1300);
  } else {
      console.error(`Element with class 'js-added-to-cart-${productId}' not found.`);
  }

  // If the product is found in the cart, increment the quantity
  if (index !== -1) {
      cart[index].quantity += 1;
  } else {
      // If the product is not found, add a new entry to the cart with quantity 1
      cart.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId:'1'
      });
  }

  // Save the updated cart to storage
  savetoStorage();
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

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if (productId===cartItem.productId){
      matchingItem=cartItem;
    }
  });
  matchingItem.deliveryOptionId=deliveryOptionId;
  savetoStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', () =>{
     console.log(xhr.response)
       // This now runs after the data is loaded
     fun();
  });
  
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}