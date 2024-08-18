import { useState, useEffect } from 'react';
import Square from './Square';
import calculateWinner from './Winner'; // Import the function

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill('-'));
  const [turn, setTurn] = useState(true);
  const [gameState, setGameState] = useState(null);

  function handleClick(i) {
    if (squares[i] !== '-' || gameState) return;
    const nextSquares = squares.slice();
    nextSquares[i] = turn ? 'X' : 'O';
    setSquares(nextSquares);
    setTurn(!turn);
  }

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setGameState(winner);
    }
  }, [squares]);

  const winner = gameState || calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next Player: ' + (turn ? 'X' : 'O');
  }

  return (
    <>
      <div>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
