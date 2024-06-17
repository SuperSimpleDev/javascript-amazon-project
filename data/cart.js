export const cart = [];
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
};
export function updateCartQuantity(){
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
}