
let cartSize = 0;

export default function cartUpdate(state = cartSize, action) {
    switch (action.type) {
        case 'UPDATE':
            try {
                return {
                    ...state, cartLen: Object.values(JSON.parse(localStorage.getItem('cart'))).flat().length
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

