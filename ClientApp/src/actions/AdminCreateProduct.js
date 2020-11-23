
export function ProductRootData(values) {
    return {
        type: 'ROOT',
        Payload: values,
    };
}

export function ProductImageData(values) {
    return {
        type: 'IMAGE',
        Payload: values,
    };
}


export function decreaseAction() {
    return {
        type: 'DECREMENT',
    };
}

