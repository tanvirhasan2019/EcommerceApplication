
let cartSize = 0;

export default function cartWithId(state = cartSize, action) {
    switch (action.type) {
        
        case 'CART':

            var cartData = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

            try {
                if (cartData.length > 0) {
                    let matchCart = cartData.filter(item => {
                        return item.id === action.Payload
                    })
                    return { ...state, data: matchCart[0].quantity }

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

