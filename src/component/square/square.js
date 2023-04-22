import React from 'react'
import "./ss.scss"
import { useState } from 'react';


function Square({ value,onSquareClick }) {
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