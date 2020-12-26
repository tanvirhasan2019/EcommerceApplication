 
export default function cartUpdate(state = [], action) {
    switch (action.type) {
        case 'UPDATE':

            var cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
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
                   
                       count += item.quantity;
                       cost += item.quantity * item.price;
                    console.log("cart reducer id quan - " + item.id + " " + item.quantity);
                    
                     Cart.List.push({ id: item.id, quantity: item.quantity });
                     //console.log("cart reducer map - " + JSON.stringify(Cart));
                    
                }
                   
                 )
            }

            Cart.Count = count;
            Cart.Cost = cost;
          
          //  console.log(" reducer Cart Data   - " + JSON.stringify(Cart));
           
            try {
                return {
                    //...state, Cart: Cart //cartLen: Object.values(JSON.parse(localStorage.getItem('cart'))).flat().length
                    ...state, data: Cart
                   // Img: Object.assign({}, ImgInitial, action.Payload)
                }
            } catch{
                return {
                    ...state, data: 0
                }
                 
            }

      
       
        default:
            return state;
    }
}

