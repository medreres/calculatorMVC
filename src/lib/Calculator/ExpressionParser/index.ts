import Operation from "../Operation";
import { defaultConstants } from "../config";
import { evaluate, getAvailableConstants } from "./services";

export default class ExpressionParser {
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

  parseExpression(expression: string): number {
    if (!this.isValidExpression(expression)) throw new SyntaxError("Expression is invalid");

    expression = this.replaceConstants(expression);

    return +evaluate.call(this, expression);
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

    // if we add new operation, set isRegexUpdated to false
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
    // regex for all operators and operands
    const regexRaw = `^(([+-]?\\d\\.?\\d?)*\\s?\\(?\\)?\\w*${this.getAvailableOperations()
      .map((operation) => {
        // if one symbol - better to escape it with //
        const isOneSymbolOperator = operation.symbol.length === 1 ? "\\" : "";
        return `(${isOneSymbolOperator}${operation.symbol})?`;
      })
      .join("")})*$`;

    const regex = new RegExp(regexRaw, "gi");
    return regex.test(expression);
  }
}
