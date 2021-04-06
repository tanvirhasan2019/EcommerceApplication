import React, { useState} from 'react';
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";

const override = css`
  display: block;
  margin: auto auto;
  border-color: red;
`;

export default function Starloader() {
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#000000");


  return (
      <div className="sweet-loading d-flex align-content-center flex-wrap">
          <RingLoader color={color} loading={loading} css={override} size={200} />
    </div>
  );
}

