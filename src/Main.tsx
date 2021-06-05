import React, { useEffect, useState } from "react";
import Board from "./assets/components/Board/Board";
import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/styles/index.css";
import calculateWinningLines from "./utils/hooks/useWinningLines";

interface SquareState {
  value: string;
  disable: boolean;
}

function Main() {
  const [squaresList, setSquaresList] = useState<SquareState[]>([]);
  const [xNext, setXNext] = useState(true);
  const [size, setSize] = useState(3);
  const [winningLines, setWinningLines] = useState<number[][]>([]);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    console.log("calculateWinningLines", calculateWinningLines(size));
    setWinningLines([...calculateWinningLines(size)]);
  }, [size]);

  useEffect(() => {
    const determineWinner = () => {
      for (const i in squaresList) {
        const line: number[] = winningLines[i] ?? [];
        let selectedSquare: SquareState | string = squaresList[line[0]];
        console.log(selectedSquare);
        if (!selectedSquare) continue;
        console.log("continue");
        selectedSquare = selectedSquare.value;
        if (
          line.reduce(
            (acc: any, squareIndex: number) =>
              acc &&
              squaresList[squareIndex]?.value &&
              selectedSquare === squaresList[squareIndex].value,
            true
          )
        ) {
          setWinner(selectedSquare);
        }
      }
    };
    determineWinner();
  }, [squaresList, winningLines, xNext]);

  const onSquareClicked = React.useCallback(
    (index: number) => {
      console.log(winner);
      if (squaresList[index]?.value || winner) {
        return;
      } else {
        const value = xNext ? "X" : "O";
        let copySquareList = squaresList;
        copySquareList[index] = { value, disable: false };
        setSquaresList([...copySquareList]);
        setXNext((x) => !x);
      }
    },
    [squaresList, winner, xNext]
  );

  const restartGame = React.useCallback(() => {
    setSquaresList([]);
    setXNext(true);
    setWinner("");
  }, []);

  const handleSizeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.length > 0 ? parseInt(e.target.value) : size;
      setSize(value);
      restartGame();
    },
    [restartGame, size]
  );
  return (
    <div className="container">
      <h2>Tic Tac Toe</h2>
      <div className="form-group">
        <label className="mb-2">Board Size</label>
        <input
          className="form-control mb-4"
          onChange={handleSizeChange}
          type="number"
          value={size}
          min={3}
        />
      </div>
      <Board
        onSquareClicked={onSquareClicked}
        squaresList={squaresList}
        size={size}
      />
      <h3 className="mt-3">{winner ? `Winner is ${winner}` : ""}</h3>
      <button onClick={restartGame} className="btn btn-primary">
        Restart Game
      </button>
    </div>
  );
}

export default Main;
