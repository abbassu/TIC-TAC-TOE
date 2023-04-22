
import { useEffect, useState } from 'react';
import "./board.scss"
import Square from '../square/square';

function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [wayPlay, setWayPlay] = useState(1);
  const [levelPlay, setLevelPlay] = useState(0);
  const [angle,setangle]=useState("")



  const [winner,setWinner]=useState("")
  async function setNull(){
   await setSquares(Array(9).fill(null))
   setangle(9)
   
  }
  function checkwinner(board){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            console.log("wineer",board[a])
            setangle(i)
            setWinner(board[a]==="X"? 2:-2)
            return board[a]==="X"? 2:-2
        }
    }
    if (board.every((element) => element)) {
        setWinner(0)
        return 0
    } 

    setWinner(null)
    return null;
  }

  function calculateWinner(board) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]==="X"? 2:-2;
        }
    }
    if (board.every((element) => element)) {
        return 0
    } 
    setWinner(null)
    return 1;
}
   function handleClick(i) {
    console.log("way ",wayPlay)
    console.log("11111")
        if (squares[i] || checkwinner(squares)){
            return;
        }
        const nextSquares = squares.slice();
        nextSquares[i] = "X";
        if(wayPlay===0){
            minimax(nextSquares,levelPlay,false,true)
        }
        else{
            if (xIsNext) {
            nextSquares[i] = "X";
            } else {
            nextSquares[i] = "O";
            }
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    useEffect(()=>{
        console.log("ooo")
        checkwinner(squares)
    },[squares])

    function minimax(board, depth, isMaximizing, firstTime) {
        const result = calculateWinner(board);
        if (depth === 0 || result!==1 ) {
            return result;
        }
        if (isMaximizing) {
            let finalScore = -10;
            let finalI = -1;
            for (let i = 0; i < 9; i++) {
                    if (board[i] === null) {
                        board[i] = 'X';
                        const score = minimax(board, depth - 1, false, false);
                        board[i] = null;
                        if (score > finalScore) {
                            finalScore = score;
                            finalI = i;
                        }
                        if (firstTime) {
                            setSquares(board)
                        }
                    }
            }
            if (firstTime) {
                board[finalI] = 'O';
            }
            return finalScore;
        } else {
            let finalScore = 10;
            let finalI = -1;
            for (let i = 0; i < 9; i++) {
                    if (board[i] === null) {
                        board[i] = 'O';
                        const score = minimax(board, depth - 1, true, false);
                        board[i] = null;
                        if (score < finalScore) {
                            finalScore = score;
                            finalI = i;
                        }
                        if (firstTime) {
                            setSquares(board)
                        }
                    }
            }
            if (firstTime) {
                board[finalI] = 'O';
            }
            return finalScore;
        }
    }
    function selectHandle(event){
        console.log("event ",event.target.value)
        if(event.target.value==="easy")setLevelPlay(1)
        else if (event.target.value==="medium")setLevelPlay(4)
        else if (event.target.value)setLevelPlay(8)
    }

  return (
    <div className="board">
        <h2 className='aa'> TIC TAC TOE </h2>
        <div className="twoplayer">

            <button className={`bb1 ${wayPlay===0? "acac":""}`} onClick={async()=>{
                await setWayPlay(0)
                setNull()
            }}> ONE PLAYER </button>
             <button className={`bb1 ${wayPlay===1? "acac":""}`}  onClick={async()=>{
                await setWayPlay(1)
                setNull()
            }}> TWO PLAYER </button>
        </div>
        <div className={`selectLevel  ${wayPlay===1? "ff":""}`} onChange={selectHandle}>
            <select name="" id="">
            <option value="hard">Hard</option>

            <option value="medium">Medium    </option>
                <option value="easy">Easy</option>
  
            </select>
        </div>

        <div className="xoxo">
            <div className={`bar dd-${angle}`}></div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={()=>{handleClick(0)}} />
                <Square value={squares[1]} onSquareClick={()=>{handleClick(1)}}/>
                <Square value={squares[2]} onSquareClick={()=>{handleClick(2)}}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={()=>{handleClick(3)}}/>
                <Square value={squares[4]} onSquareClick={()=>{handleClick(4)}}/>
                <Square value={squares[5]} onSquareClick={()=>{handleClick(5)}}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={()=>{handleClick(6)}}/>
                <Square value={squares[7]} onSquareClick={()=>{handleClick(7)}}/>
                <Square value={squares[8]} onSquareClick={()=>{handleClick(8)}}/>
            </div>
        </div>
        <div className="optiion">
            <button className='bb12' onClick={()=>{
                setSquares(Array(9).fill(null))
                setangle("")
            }}> Play Again </button>
            <h2 className="status">   { winner===-2 || winner===2  ? `Winner is : ${winner===-2? "O" :"X"} `: `${winner===0? "Ohh Tie" :""}`}</h2>
        </div>
    </div>
  );
}
export default Board;