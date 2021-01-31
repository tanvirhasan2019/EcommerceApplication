
const data = {

};

export default function CreditCardDetails(state = data, action) {
    switch (action.type) {
        case 'ADD-CARD':
           
            return {
                ...state, data: action.Payload

            };

        case 'DELETE-CARD':
            
            return {
               
                ...state, data:[]

            };

       
        default:
            return state;
    }
}

