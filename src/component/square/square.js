import React from 'react'
import "./ss.scss"
import { useState } from 'react';


function Square({ value,onSquareClick }) {
    // const [value, setValue] = useState(null);

    function handleClick() {
      // setValue('X');
    }
  
    return (

      <div
        className="square"
        onClick={onSquareClick}
      >
        {value}
      </div>
    );
}

export default Square