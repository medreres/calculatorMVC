import { defaultConstants, Operations } from "../config";
import Operation from "../Operation/Operation";
import { evaluate, getAvailableConstants, getMostPrecedentOperator, makeRegex, parseOperations } from "./services";

// lazy initialization
// TODO refactor
export default class ExpressionParser {
  // if we add new operation, set isRegexUpdated to false
  protected isRegexUpdated: boolean = false;
  protected operationsRaw: Map<string, Operation> = new Map();
  protected operationsRegex: RegExp | null = null;
  protected constants: Map<string, number> = new Map();

  constructor() {
    // default constants
    Object.entries(defaultConstants).forEach(([key, value]: [string, number]) => {
      this.addNewConstant(key, value);
    });
  }

  parseExpression(expression: string): string {
    // replace all constants first
    expression = this.replaceConstants(expression);

    let innerMostParenthesis;

    // if parenthesis is found, start inner loop
    while ((innerMostParenthesis = expression.lastIndexOf(Operations.LEFT_PARENTHESIS)) !== -1) {
      // TODO error handling
      const closingParenthesis = (innerMostParenthesis +
        expression.slice(innerMostParenthesis).indexOf(Operations.RIGHT_PARENTHESIS)) as number;

      // get left and right part and replace the part between
      const leftPart = expression.slice(0, innerMostParenthesis);
      const rightPart = expression.slice(closingParenthesis + 1, expression.length);
      const evaluatedPart = this.parseExpression(expression.slice(innerMostParenthesis + 1, closingParenthesis));

      expression = `${leftPart} ${evaluatedPart} ${rightPart}`;
    }

    // parse all operations and perform them one by one, following their precedence
    let operators = parseOperations.call(this, expression);
    while (operators.length > 0) {
      const operation = getMostPrecedentOperator.call(this, operators);

      const regex = makeRegex(operation);
      const replacement = evaluate.call(this, expression, operation) as string;
      expression = expression.replace(regex, replacement);
    }

    return expression;
  }

  getOperation(symbol: string): Operation | undefined {
    return this.operationsRaw.get(symbol);
  }

  getAvailableOperations(): Operation[] {
    return Array.from(this.operationsRaw.values());
  }

  addOperation(...operations: Operation[]) {
    operations.forEach((operation) => {
      if (this.operationsRaw.has(operation.symbol)) {
        throw new Error("Operation already exist");
      }

      this.operationsRaw.set(operation.symbol, operation);
    });

    // regex needs to be updated
    this.isRegexUpdated = false;
  }

  replaceConstants(exp: string): string {
    Object.entries(getAvailableConstants.call(this)).forEach(([key, value]) => {
      exp = exp.replace(key, value.toString());
    });

    return exp;
  }

  addNewConstant(key: string, value: number): ExpressionParser {
    if (this.constants.has(key)) throw new Error("Constant already exist");
    this.constants.set(key, value);

    // chaining
    return this;
  }

  isValidExpression(expression: string): boolean {
    // ([+-]?\\d\\.?\\d?) - regex for numbers with floating point

    // ${modelInstance
    // .getAvailableOperations()
    // .map((operation) => `(\\${operation.symbol})?`)
    // .join("")})*$ retrieves all the available operators and turn into regex
    // TODO

    const regexRaw = `^(([+-]?\\d\\.?\\d?)*\\s?\\(?\\)?\\w*${this.getAvailableOperations()
      .map((operation) => {
        const isOneSymbolOperator = operation.symbol.length === 1 ? "\\" : "";
        return `(${isOneSymbolOperator}${operation.symbol})?`;
      })
      .join("")})*$`;

    // console.log(regexRaw);

    const regex = new RegExp(regexRaw, "i");
    return regex.test(expression);
  }
}
