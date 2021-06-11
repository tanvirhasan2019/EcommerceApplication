import React from "react";
import ReactDOM from "react-dom";
import MapExample from "./MapExample";
import { NavMenu } from '../NavMenu';

import "leaflet-control-geocoder/dist/Control.Geocoder.js";

export default function Map () {
    return (
        <>
            <NavMenu />
            <div className="container">
                <MapExample />
            </div>
        </>
        )

}
