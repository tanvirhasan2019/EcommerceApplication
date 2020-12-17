
let cartSize = 0;

export default function cartUpdate(state = cartSize, action) {
    switch (action.type) {
        case 'UPDATE':

            var cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            let count = 0;
            if (cartData.length > 0) {
                cartData.map(item =>
                    count += item.quantity
                 )
            }

            try {
                return {
                    ...state, cartLen:count //cartLen: Object.values(JSON.parse(localStorage.getItem('cart'))).flat().length
                }
            } catch{
                return {
                    ...state, cartLen: 0
                }
                 
            }
       
        default:
            return state;
    }
}

