import './MenModalCustom.scss';

import React, { useState } from "react";


export default function IncDecButton(props) {

    const [count, setCount] = useState(1);
   
  /*  const increase = () => {
        setCount(prevCount => prevCount + 1);
    };

    const decrease = () => {
        if (count != 0) {
            setCount(prevCount => prevCount - 1);
        } else {

           

        }
       
    }; 
    */
   
    return (
        <div className="d-flex justify-content-center button-inc-dec" style={{ backgroundColor: '#3f51b5', height:'30px', width:'100%' }}>
            <button style={{ backgroundColor: '#3f51b5', border: 'none' }} onClick={props.decrease}
                className="fa fa-minus fa-inverse"></button>
            <input
                type="text" className="number custom-filed" value={props.onChange}></input>
            <button style={{ backgroundColor: '#3f51b5', border: 'none' }} onClick={props.increase}
                className="fa fa-plus fa-inverse "></button>

        </div>
    );
}