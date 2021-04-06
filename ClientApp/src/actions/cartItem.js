export const CART_UPDATE_REQUEST = "CART_UPDATE_REQUEST";
export const CART_UPDATE_ERROR = "CART_UPDATE_ERROR";

export function cartUpdate() {
    try {
        console.log('REDUX CART UPDATE CALLED')
        return {
            type: CART_UPDATE_REQUEST
        };
    } catch (error) {
        return {
            type: CART_UPDATE_ERROR
        };
    }
   
}

