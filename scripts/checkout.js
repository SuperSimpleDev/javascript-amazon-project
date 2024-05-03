import { renderOrderSummary } from "../checkout/orderSummary.js";
import { renderPaymentSummary } from "../checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../backend-practice.js';
import { loadCart } from "../data/cart.js";

Promise.all([
  new Promise(( resolve)=>{
    loadProducts(()=>{  
        resolve();
      });
    }),
    new Promise((resolve)=>{
      loadCart(()=>{
        resolve();    
      });
    })
]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})

// new Promise(( resolve)=>{
// loadProducts(()=>{  
//     resolve();
//   });
// }).then(()=>{
//   return new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve();    
//     });
//   });
// }).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// });
  


// loadProducts(()=>{
//   loadCart(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
//   });
// });


