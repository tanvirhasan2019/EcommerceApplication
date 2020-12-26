export function cartWithId(id) {
    console.log("ACTION CART WITH ID--- " + id);
    return {
        type: 'CART',
        Payload: id
    };
}