
import { toast } from 'react-toastify';
import React, { Component } from 'react';

export default function addToCart(id, quantity, title, img, price) {
    

    let customDesign =
        <div className='row' style={{ textAlign:'center' }}>
            <img style={{ width: '50px', height: '50px' }} src={img} alt=' ' />
            <p style={{ marginLeft: '5px' }}>{title}</p>
        </div>;



    // FUNCTION INCREASE QUANTITY ACROSS ID
    let updateCart = (oldproduct) => {

        let matchCart = oldproduct.filter(item => {
            return item.id === id
        })

        let unmatchCart = oldproduct.filter(item => {
            return item.id !== id
        })

      
        var updatedData = { id: id, quantity: matchCart[0].quantity + quantity, price: price, title:title }

        //PUSH THE UPDATE DATA AND REMOVE OLD ONE
        unmatchCart.push(updatedData);
     
        localStorage.setItem('cart', JSON.stringify(unmatchCart));
        
    }   
   


    try {

        var data = { id: id, quantity: quantity, price: price, title: title }

      
        var oldproduct = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
       

        if ([...oldproduct].length === 0 || ![...oldproduct].find((p) => p.id === id))
        {
             

            oldproduct.push(data)
            localStorage.setItem('cart', JSON.stringify(oldproduct))
                     
            toast.info(customDesign, {
                position: "top-left",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
           
             
        } else if (oldproduct.find((p) => p.id === id)) {                                
            console.log("OLD PRODUCT -- " + JSON.stringify(oldproduct));
            updateCart(oldproduct);

            toast.success(customDesign, {
                position: "bottom-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });  
         }
    }catch (err) {
        alert("SOMETHING WENT WENT WRONG");  
    }   
}





