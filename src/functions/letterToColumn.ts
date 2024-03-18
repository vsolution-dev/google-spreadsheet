export const letterToColumn = (letter: string) => {
  let column = 0;
  for (let index = 0; index < letter.length; index++) {
    column += (letter.charCodeAt(index) - 64) * 26 ** (letter.length - index - 1);
  }
  return column;
}
