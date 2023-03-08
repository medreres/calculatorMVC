export function parseExpression(expression: string, operationsSymbols: string[]): (string | number)[] {
  const tokens = [];
  let currentToken = "";
  const regexRaw = `[${operationsSymbols.map((operation) => `\\${operation}`)}]`;
  const regex = new RegExp(regexRaw);

  for (let i = 0; i < expression.length; i++) {
    const char = expression.charAt(i);

    if (char === " ") {
      // ignore whitespace
      continue;
    } else if (!isNaN(+char) || char === "." || (char === "-" && currentToken.length === 0)) {
      // append digits and decimal points to current token
      currentToken += char;
    } else if (regex.test(char)) {
      // push current token and operator to tokens array
      if (currentToken !== "") {
        tokens.push(currentToken);
        currentToken = "";
      }
      tokens.push(char);
    } else if (/[a-zA-Z]/.test(char)) {
      // parse function name and push to tokens array
      let functionName = char;
      i++;

      while (i < expression.length && /[a-zA-Z]/.test(expression.charAt(i))) {
        functionName += expression.charAt(i);
        i++;
      }
      tokens.push(functionName);
      i--;
    } else {
      // invalid character
      throw new Error(`Invalid character '${char}' at position ${i}`);
    }
  }

  // push last token to array (if it exists)
  if (currentToken !== "") {
    tokens.push(currentToken);
  }

  // if first number is negative, combine minus operation and number
  if (tokens[0] === "-") {
    tokens.shift();
    tokens[0] = -tokens[0];
  }

  return tokens;
}
