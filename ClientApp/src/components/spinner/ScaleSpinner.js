import React, { useState } from "react";
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function ScaleSpinner() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#36D7B7");

  return (
    <div className="sweet-loading">
      

      <ScaleLoader
            height={200}
            width={7}
            radius={40}
            margin={5}
            color={color} 
            loading={loading} 
            css={override}  
      />

    </div>
  );
}

export default ScaleSpinner;