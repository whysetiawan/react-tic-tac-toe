const calculateLines = (size: number) => {
  const winningLines = [];
  const diagonalLeft: number[] = [];
  const diagonalRight: number[] = [];

  for (let row = 0; row < size; row++) {
    const colLines = [];
    const rowLines: any = [];
    diagonalLeft.push(row * size + row);
    diagonalRight.push(row * size + (size - row - 1));
    for (let col = 0; col < size; col++) {
      rowLines.push(row * size + col);
      colLines.push(col * size + row);
    }
    winningLines.push(rowLines);
    winningLines.push(colLines);
  }
  winningLines.push(diagonalLeft);
  winningLines.push(diagonalRight);
  return winningLines;
};

export default calculateLines;
