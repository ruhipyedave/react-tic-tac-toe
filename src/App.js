// import logo from './logo.svg';
import { useState } from "react";

import './App.css';
import { Board } from './components/Board';

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([state]);
  const [isNextX, setNext] = useState(true);
  const [move, setMove] = useState(0);
  function handlePlay(nextState, mode) {
    setState(nextState);
    setNext(!isNextX);
    const nextMove = move + 1;
    setMove(nextMove);
    if (nextMove < history.length) {
      // discard all moves after next move
      setHistory([...history.slice(0, nextMove), nextState]);
    }
    else {
      setHistory([...history, nextState]);
    }
  }

  function replay() {
    setState(Array(9).fill(null));
    setNext(!isNextX);
    setMove(0);
    setHistory([Array(9).fill(null)]);
  }

  function undo() {
    if (move === 0) {
      return;
    }
    const prevMove = move - 1;
    setMove(prevMove);
    setState(history[prevMove]);
    setNext(!isNextX);
  }

  function redo() {
    if (move === history.length - 1) {
      return;
    }
    const nextMove = move + 1;
    setMove(nextMove);
    setState(history[nextMove]);
    setNext(!isNextX);
  }

  function isDisabled(mode) {
    switch(mode){
      case 'undo':
      case 'replay':
        return move <= 0;

      case 'redo':
        return move >= history.length - 1;

      default:
        return false;
    }
  }

  return (
    <>
      <div className='row'>
        <button className='action-btn' onClick={replay} disabled={isDisabled('replay')}>Replay</button>
        <button className='action-btn' onClick={undo} disabled={isDisabled('undo')}>Undo</button>
        <button className='action-btn' onClick={redo} disabled={isDisabled('redo')}>Redo</button>
      </div>
      <Board isNextX={isNextX} squares={state} onPlay={handlePlay}></Board>
    </>
  );
}

export default App;
