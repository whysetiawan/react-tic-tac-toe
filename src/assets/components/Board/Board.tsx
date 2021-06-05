import React from "react";
import "./Board.css";

interface SquareState {
  value: string;
  disable: boolean;
}

interface BoardProps {
  size: number;
  onSquareClicked: (i: number) => void;
  squaresList: SquareState[];
}

const Board: React.FC<BoardProps> = ({
  size,
  onSquareClicked,
  squaresList,
}) => {
  const renderBoard = React.useCallback(() => {
    const board: JSX.Element[] = [];
    for (let row = 0; row < size; row++) {
      const start = row * size;
      const newRow = [];
      for (let column = 0; column < size; column++) {
        const index = start + column;
        newRow.push(
          <button
            className="square"
            disabled={squaresList[index]?.disable}
            key={index}
            onClick={() => onSquareClicked(index)}
          >
            {squaresList[index]?.value ?? ""}
          </button>
        );
      }
      board.push(
        <div key={row} className="row">
          {newRow}
        </div>
      );
    }
    return board;
  }, [onSquareClicked, size, squaresList]);

  return <>{renderBoard()}</>;
};

export default Board;
