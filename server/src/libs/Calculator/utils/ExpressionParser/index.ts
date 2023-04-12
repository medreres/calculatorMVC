import { defaultConstants, defaultOperations } from "../../config";
import { Constant } from "../../interfaces";
import Operation from "../Operation";

import {
  createExpressionValidityRegex,
  getAvailableConstants,
  ParsedOperation,
  parseFunctions,
  parseSimpleOperations,
  parseTokens,
} from "./services";

export default class ExpressionParser {
  protected expressionValidityRegex: RegExp | null = null;
  protected isValidityRegexUpdated: boolean = false;

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
    this.isValidityRegexUpdated = false;
  }

  parseOperations(expression: string): ParsedOperation[] {
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
    this.isValidityRegexUpdated = false;
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

  getConstants(): Constant[] {
    const constants: Constant[] = [];
    Array.from(this.constants.entries()).forEach(([key, value]) => {
      constants.push({ key, value });
    });
    return constants;
  }

  getTokens(expression: string) {
    const operationSymbols = Array.from(this.getAvailableOperations())
      .filter((operation) => operation.symbol.length === 1)
      .map((operation) => operation.symbol);

    return parseTokens.call(this, expression, operationSymbols);
  }

  isValidExpression(expression: string): boolean {
    // instantiate validity regex if not updated or initialized
    if (!this.isValidityRegexUpdated || this.expressionValidityRegex == null) {
      this.expressionValidityRegex = createExpressionValidityRegex.call(this);
      this.isValidityRegexUpdated = true;
    }

    // if there no tokens, then expression is invalid
    if (this.parseOperations(expression).length == 0) {
      return false;
    }

    return this.expressionValidityRegex.test(expression);
  }
}