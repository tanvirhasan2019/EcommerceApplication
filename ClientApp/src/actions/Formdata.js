
export function MenRootData(values) {
    return {
        type: 'ROOT',
        Payload: values,
    };
}

export function MenImageData(values) {
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

