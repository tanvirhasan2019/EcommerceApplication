
const data = {

};

export default function ShippingDetails(state = data, action) {
    switch (action.type) {
        case 'ADD':

            return {
                ...state, data: action.Payload

            };

        case 'DELETE':

            return {

                ...state, data: []

            };


        default:
            return state;
    }
}

