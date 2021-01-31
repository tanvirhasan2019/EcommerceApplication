import React, { useState, useEffect } from 'react';
import { css } from "@emotion/core";

import ClipLoader from "react-spinners/ClipLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  border-color: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Ringloader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("blue");

    return (
        <div className="sweet-loading"> 
            <ClipLoader color={color} loading={loading} css={override} size={150} />
        </div>
    );
}

