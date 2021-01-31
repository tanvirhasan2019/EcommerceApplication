export function CreditCard_Add(values) {
    return {
        type: 'ADD-CARD',
        Payload: values,
    };
}

export function CreditCard_Delete() {
    return {
        type: 'DELETE-CARD'
    };
}
