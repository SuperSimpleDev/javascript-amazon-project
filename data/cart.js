export let cart = JSON.parse(localStorage.getItem('cart'));


if(!cart){
  cart = [{
 productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
 quantity:2, 
},{
  productId:'19c6a64a-5463-4d45-9af8-e41140a4100c',
 quantity:2, 
}];
};

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
};
export function addToCart(productId){
  let matchingItem;
      cart.forEach((CartItem)=>{
        if(productId === CartItem.productId){
          matchingItem = CartItem;
        }
      });
      const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = Number(quantitySelector.value);
      if(matchingItem){
        matchingItem.quantity += quantity;
      }else{
        cart.push({
          productId,
          quantity,
        });
      };
      saveToStorage();
};
export function updateCartQuantity(productId){
  let addedMessageTimeoutId;
  let cartQuantity = 0;
      cart.forEach((CartItem)=>{
        cartQuantity += CartItem.quantity;
      });
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
      addedMessage.classList.add('added-to-cart-visible');
      if(addedMessageTimeoutId){clearTimeout(addedMessageTimeoutId);
      }
      const timeoutId = setTimeout(()=>{
        addedMessage.classList.remove('added-to-cart-visible')
      },1500);
      addedMessageTimeoutId = timeoutId;
};
export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((CartItem)=>{
    if(CartItem.productId !== productId){
      newCart.push(CartItem);
    }
  });
  cart = newCart;
  saveToStorage();
};