import {
    CART_UPDATE_REQUEST,
    CART_UPDATE_ERROR
} from "../actions/cartItem";

export default function cartUpdate(state = [], action) {
    switch (action.type) {


        case CART_UPDATE_REQUEST:

            console.log('CART UPDATE  called')
            var cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            console.log('reducer cart data', {cartData})
            let count = 0;
            let cost = 0;
           // let newCart = [];
          //  var List = [];
            var Cart = {

                Cost: 0,
                Count: 0,
                List: [

                ]


            }
           
            if (cartData.length > 0) {
               

                   
                   cartData.map(item => {
                       if (item.quantity > 0) {

                           count += item.quantity;
                           cost += item.quantity * item.price;

                           Cart.List.push({ id: item.id, quantity: item.quantity, title: item.title, price: item.price });

                       }
                      
                    
                }
                   
                 )
            }

            Cart.Count = count;
            Cart.Cost = cost;
          
           
            try {
                return {
                    ...state, data: Cart
                  
                }
            } catch{
                return {
                    ...state, data: 0
                }
                 
            }

      
       
        default:
            console.log('Default called update not work')
            return state;
    }
}

