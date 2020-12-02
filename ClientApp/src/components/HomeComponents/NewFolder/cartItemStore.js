
export default function addToCart(id, quantity) {
    try {

        var data ={ id: id, quantity: quantity }

       // var dataCart = JSON.parse(localStorage.getItem('cart'))
        var oldproduct = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        console.log("ALL " + JSON.parse(localStorage.getItem('cart')))
        if ([...oldproduct].length === 0 || ![...oldproduct].find((p) => p.id === id))
        {
             

            oldproduct.push(data)
            localStorage.setItem('cart', JSON.stringify(oldproduct))
            alert("ITEM first time ADDED");

          

          

        } else if (oldproduct.find((p) => p.id === id)) {
                             
            alert("ITEM ALREADY ADDED");

            
         }
        
       
      
    }catch (err) {
        alert("SOMETHING WENT WENT WRONG");
        console.log(err);
       
    }
    
}