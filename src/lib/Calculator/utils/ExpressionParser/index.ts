import Operation from "../Operation";
import { defaultConstants, defaultOperations, numberRegexRaw, Operations } from "../../config";
import { getAvailableConstants, ParsedOperation, parseFunctions, parseSimpleOperations, parseTokens } from "./services";

export default class ExpressionParser {
  protected isRegexUpdated: boolean = false;
  protected operationsRaw: Map<string, Operation> = new Map();
  protected operationsRegex: RegExp | null = null;
  protected constants: Map<string, number> = new Map();

  constructor() {
    // default constants
    Object.entries(defaultConstants).forEach(([key, value]: [string, number]) => {
      this.addConstant(key, value);
    });

    // default operations
    this.addOperation(...defaultOperations);
  }

  getOperations(expression: string): ParsedOperation[] {
    const functions = parseFunctions.call(this, expression);

    const simpleOperations = parseSimpleOperations.call(this, expression);

    return [...simpleOperations, ...functions];
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
        throw new Error(`Operation ${operation.symbol} already exist`);
      }

      this.operationsRaw.set(operation.symbol, operation);
    });

    // if we add new operation, set isRegexUpdated to false
    // regex needs to be updated
    this.isRegexUpdated = false;
  }

  replaceConstants(exp: string): string {
    Object.entries(getAvailableConstants.call(this)).forEach(([key, value]) => {
      exp = exp.replaceAll(key, value.toString());
    });

    return exp;
  }

  addConstant(key: string, value: number): ExpressionParser {
    if (this.constants.has(key)) {
      throw new Error("Constant already exist");
    }

    this.constants.set(key, value);

    // chaining
    return this;
  }

  getTokens(expression: string) {
    const operationSymbols = Array.from(this.getAvailableOperations())
      .filter((operation) => operation.symbol.length === 1)
      .map((operation) => operation.symbol);

    return parseTokens.call(this, expression, operationSymbols);
  }

  isValidExpression(expression: string): boolean {
    // allows parentheses in string
    const parenthesesRaw = `\\${Operations.LEFT_PARENTHESIS}?\\${Operations.RIGHT_PARENTHESIS}?`;

    // regex that consist of operations available in calculator class
    const operationsRaw = this.getAvailableOperations()
      .map((operation) => {
        // if one symbol - better to escape it with //
        const isOneSymbolOperator = operation.symbol.length === 1 ? "\\" : "";
        return `(${isOneSymbolOperator}${operation.symbol})?`;
      })
      .join("");

    const regexRaw = `^(${numberRegexRaw}*\\s?${parenthesesRaw}\\w*${operationsRaw})*$`;
    const validityRegex = new RegExp(regexRaw, "gi");

    return validityRegex.test(expression);
  }
}
