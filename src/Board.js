import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every((row) => row.every((cell) => !cell));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);
      const boardCopy = oldBoard.map((row) => [...row]);

      const flipCell = (y, x) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
      flipCell(y, x);
      flipCell(y - 1, x);
      flipCell(y + 1, x);
      flipCell(y, x - 1);
      flipCell(y, x + 1);

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO

  if (hasWon()) {
    return <div className="Board-won">You Won!!!</div>;
  }

  const tableBoard = [];
  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }
  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
