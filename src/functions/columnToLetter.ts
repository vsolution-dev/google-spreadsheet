export const columnToLetter = (column: number) => {
  let letter = '';
  while (column > 0) {
    const alphabet = (column - 1) % 26;
    letter = String.fromCharCode(alphabet + 65) + letter;
    column = (column - alphabet - 1) / 26;
  }
  return letter;
}
