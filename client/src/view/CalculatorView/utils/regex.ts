export function isInputValid(expression: string): boolean {
  // TODO better regex
  const regex = /\d/;
  const isValid = regex.test(expression);
  return isValid;
}
