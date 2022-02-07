/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
export default function toUpFirstLetter(string) {
  let newString;
  for (let i = 0; i < string.length; i++) {
    if (i === 0) {
      newString = string[i].toUpperCase();
    } else if (string[i - 1] === '-') {
      newString += string[i].toUpperCase();
    } else {
      newString += string[i];
    }
  }
  return newString;
}
