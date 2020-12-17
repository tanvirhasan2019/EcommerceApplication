
import React from 'react';
export default function IncDecButton() {

    return (
        <div className="d-flex justify-content-center">
            <button style={{ backgroundColor:'blue' }} className="fa fa-minus fa-inverse"></button>
            <input
                type="text" className="number " value={2}></input>
            <button style={{ backgroundColor: 'blue' }} className="fa fa-plus fa-inverse "></button>
           
        </div>
    );
}