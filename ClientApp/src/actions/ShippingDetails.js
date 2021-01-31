export function ShippingData_Add(values) {
    return {
        type: 'ADD',
        Payload: values,
    };
}

export function ShippingData_Delete() {
    return {
        type: 'DELETE',      
    };
}



