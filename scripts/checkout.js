import { renderOrderSummary } from "../checkout/orderSummary.js";
import { renderPaymentSummary } from "../checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
// import '../backend-practice.js';
import { loadCart } from "../data/cart.js";

async function loadPage(){
  try {
    await loadProductsFetch();
    
  } 
  catch (error) {
    console.log('Unexpected error.Please try again');
  }
  
}

loadPage().then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});


// Promise.all([
//   loadProductsFetch(),
//     new Promise((resolve)=>{
//       loadCart(()=>{
//         resolve();    
//       });
//     })
// ]).then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// })

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


